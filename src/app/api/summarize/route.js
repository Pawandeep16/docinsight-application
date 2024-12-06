import OpenAI from "openai";
import { NextResponse } from "next/server";
import AdmZip from "adm-zip";
import { parseStringPromise } from "xml2js";
import Tesseract from "tesseract.js";
import fs from "fs/promises";

// Setup OpenAI configuration
const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_KEY,
});

// Function to parse DOCX files
async function parseDocx(buffer) {
  try {
    const zip = new AdmZip(buffer);
    const xmlFile = zip.readAsText("word/document.xml");
    const data = await parseStringPromise(xmlFile);

    let extractedText = "";
    const paragraphs = data?.["w:document"]?.["w:body"]?.[0]?.["w:p"];

    if (paragraphs && Array.isArray(paragraphs)) {
      paragraphs.forEach((para) => {
        const runs = para["w:r"];
        if (runs && Array.isArray(runs)) {
          runs.forEach((run) => {
            const texts = run["w:t"];
            if (texts && Array.isArray(texts)) {
              extractedText += texts.join("") + "\n";
            }
          });
        }
      });
    } else {
      throw new Error(
        "DOCX file does not contain the expected paragraph structure."
      );
    }

    return extractedText.trim();
  } catch (error) {
    console.error(`Error parsing DOCX: ${error.message}`);
    throw new Error(`Error parsing DOCX: ${error.message}`);
  }
}

// Function to perform OCR on images
async function parseImage(buffer) {
  const ocrResult = await Tesseract.recognize(buffer, "eng");
  return ocrResult.data.text;
}

// Function to parse XML files
async function parseXml(buffer) {
  try {
    const xmlString = buffer.toString(); // Convert buffer to string
    const data = await parseStringPromise(xmlString); // Parse the XML
    return JSON.stringify(data); // Return as JSON string or plain text
  } catch (error) {
    console.error(`Error parsing XML: ${error.message}`);
    throw new Error(`Error parsing XML: ${error.message}`);
  }
}

export async function POST(request) {
  const formData = await request.formData();
  const file = formData.get("file");
  const filePath = formData.get("filePath"); // Extract path for converted `.docx`
  const question = formData.get("question");

  if (!file && !filePath) {
    return NextResponse.json(
      { error: "No file or file path provided." },
      { status: 400 }
    );
  }

  if (!question || question.trim().length === 0) {
    return NextResponse.json(
      { error: "No question provided." },
      { status: 400 }
    );
  }

  try {
    let content = "";

    if (file) {
      const fileBuffer = Buffer.from(await file.arrayBuffer());

      // Handle PDF Conversion
      if (file.type === "application/pdf") {
        return NextResponse.json(
          { message: "PDF detected. Convert to DOCX first." },
          { status: 400 }
        );
      }

      // Handle DOCX files
      if (
        file.type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        content = await parseDocx(fileBuffer);
      }
      // Handle XML files
      else if (
        file.type === "text/xml" ||
        file.type === "application/xml" ||
        file.type === "application/xhtml+xml" ||
        file.type === "text/plain"
      ) {
        content = await parseXml(fileBuffer);
      }
      // Handle Image files (JPG, PNG)
      else if (["image/jpeg", "image/png"].includes(file.type)) {
        content = await parseImage(fileBuffer);
      } else {
        throw new Error(
          `Uploaded file type is: ${file.type}. Expected DOCX, XML, or images.`
        );
      }
    }

    // Handle `.docx` via file path (after PDF conversion)
    if (filePath) {
      const fileBuffer = await fs.readFile(filePath);
      content = await parseDocx(fileBuffer);
    }

    console.log("Extracted content:", content);

    // Call OpenAI API
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "Summarize this document based on the following question.",
        },
        { role: "user", content: `Document content: ${content}` },
        { role: "user", content: `Question: ${question}` },
      ],
    });

    return new Response(
      JSON.stringify({ summary: response.choices[0].message.content }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing document:", error.message);
    return NextResponse.json(
      { error: `Error processing document: ${error.message}` },
      { status: 500 }
    );
  }
}
