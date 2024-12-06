import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";
import OpenAI from "openai";

// Initialize OpenAI API
const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_KEY,
});

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("imageFile");

    if (!file) {
      return NextResponse.json(
        { error: "Image file is required" },
        { status: 400 }
      );
    }

    // Define temporary paths for the uploaded image and the converted DOCX
    const uploadsDir = path.join(process.cwd(), "uploads");
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const imagePath = path.join(uploadsDir, file.name);
    const docxPath = imagePath.replace(path.extname(file.name), ".docx");

    // Save the image file locally
    const imageBuffer = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(imagePath, imageBuffer);

    // Execute the Python script for text extraction
    const scriptPath = path.join(
      process.cwd(),
      "scripts",
      "extract_text_to_docx.py"
    );
    const { spawn } = require("child_process");

    const pythonProcess = spawn("python", [scriptPath, imagePath, docxPath]);

    return new Promise((resolve, reject) => {
      pythonProcess.on("close", async (code) => {
        if (code === 0) {
          // After successful text extraction, read the DOCX file
          if (!fs.existsSync(docxPath)) {
            return reject(
              NextResponse.json(
                { error: "DOCX file was not generated" },
                { status: 500 }
              )
            );
          }

          // Read the text content from the DOCX file
          const docxBuffer = fs.readFileSync(docxPath);
          const mammoth = require("mammoth");
          let content;
          try {
            const result = await mammoth.extractRawText({ buffer: docxBuffer });
            content = result.value; // Extracted text content
          } catch (error) {
            console.error("Error parsing DOCX with Mammoth:", error);
            return reject(
              NextResponse.json(
                { error: "Failed to parse DOCX file" },
                { status: 500 }
              )
            );
          }

          // Send the extracted text to OpenAI for summarization
          const question =
            formData.get("question") || "Summarize the content of this image.";
          try {
            const response = await openai.chat.completions.create({
              model: "gpt-3.5-turbo",
              messages: [
                { role: "system", content: "Summarize this document." },
                { role: "user", content: content },
                { role: "user", content: `Question: ${question}` },
              ],
            });

            resolve(
              NextResponse.json(
                { summary: response.choices[0].message.content },
                { status: 200 }
              )
            );
          } catch (error) {
            console.error("Error with OpenAI API:", error);
            return reject(
              NextResponse.json(
                { error: "Failed to generate summary" },
                { status: 500 }
              )
            );
          }
        } else {
          reject(
            NextResponse.json(
              { error: "Python script execution failed" },
              { status: 500 }
            )
          );
        }
      });

      pythonProcess.stderr.on("data", (data) => {
        console.error("Python script error:", data.toString());
      });
    });
  } catch (error) {
    console.error("Error in POST handler:", error);
    return NextResponse.json(
      { error: error.message || "An error occurred" },
      { status: 500 }
    );
  }
}
