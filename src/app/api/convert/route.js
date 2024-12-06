// import fs from "fs";
// import path from "path";
// import { NextResponse } from "next/server";
// import mammoth from "mammoth"; // DOCX parsing
// import OpenAI from "openai";
// import { spawn } from "child_process";

// // Initialize OpenAI API
// const openai = new OpenAI({
//   apiKey: process.env.OPEN_AI_KEY,
// });

// export async function POST(req) {
//   try {
//     const formData = await req.formData();
//     const file = formData.get("pdfFile");

//     if (!file) {
//       return NextResponse.json(
//         { error: "PDF file is required" },
//         { status: 400 }
//       );
//     }

//     // Create the uploads directory if it doesn't exist
//     const uploadsDir = path.join(process.cwd(), "uploads");
//     if (!fs.existsSync(uploadsDir)) {
//       fs.mkdirSync(uploadsDir, { recursive: true });
//     }

//     const pdfPath = path.join(uploadsDir, file.name);
//     const docxPath = pdfPath.replace(".pdf", ".docx");

//     // Save the PDF file locally
//     const pdfBuffer = Buffer.from(await file.arrayBuffer());
//     fs.writeFileSync(pdfPath, pdfBuffer);

//     // Path to the Python script
//     const scriptPath = path.join(process.cwd(), "scripts", "convert_pdf.py");

//     // Execute the Python script for PDF to DOCX conversion
//     const pythonProcess = spawn("python", [scriptPath, pdfPath, docxPath]);

//     return new Promise((resolve, reject) => {
//       pythonProcess.on("close", async (code) => {
//         if (code === 0) {
//           // After successful conversion, read and process the DOCX file
//           if (!fs.existsSync(docxPath)) {
//             return reject(
//               NextResponse.json(
//                 { error: "DOCX file was not generated" },
//                 { status: 500 }
//               )
//             );
//           }

//           try {
//             const docxBuffer = fs.readFileSync(docxPath);

//             // Extract text from DOCX using Mammoth
//             const result = await mammoth.extractRawText({ buffer: docxBuffer });
//             const content = result.value;

//             // Summarize content using OpenAI
//             const question =
//               formData.get("question") || "Summarize this document.";

//             const response = await openai.chat.completions.create({
//               model: "gpt-3.5-turbo",
//               messages: [
//                 { role: "system", content: "Summarize this document." },
//                 { role: "user", content: content },
//                 { role: "user", content: `Question: ${question}` },
//               ],
//             });

//             resolve(
//               NextResponse.json(
//                 { summary: response.choices[0].message.content },
//                 { status: 200 }
//               )
//             );
//           } catch (error) {
//             console.error("Error during processing:", error);
//             reject(
//               NextResponse.json(
//                 { error: "Failed to process DOCX or summarize content" },
//                 { status: 500 }
//               )
//             );
//           }
//         } else {
//           reject(
//             NextResponse.json(
//               { error: "Python script execution failed" },
//               { status: 500 }
//             )
//           );
//         }
//       });

//       // Capture errors from the Python process
//       pythonProcess.stderr.on("data", (data) => {
//         console.error("Python script error:", data.toString());
//       });
//     });
//   } catch (error) {
//     console.error("Error in POST handler:", error);
//     return NextResponse.json(
//       { error: error.message || "An error occurred" },
//       { status: 500 }
//     );
//   }
// }


// new code

import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";
import mammoth from "mammoth"; // DOCX parsing
import OpenAI from "openai"; // Correct import for OpenAI
import { spawn } from "child_process";

// Initialize OpenAI API
const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_KEY,
});

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("pdfFile");

    if (!file) {
      return NextResponse.json(
        { error: "PDF file is required" },
        { status: 400 }
      );
    }

    // Check if Vercel's temporary directory should be used
    const uploadsDir = path.join("/tmp", "uploads"); // Use /tmp for Vercel compatibility
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const pdfPath = path.join(uploadsDir, file.name);
    const docxPath = pdfPath.replace(".pdf", ".docx");

    // Save the PDF file temporarily
    const pdfBuffer = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(pdfPath, pdfBuffer);

    // Path to the Python script
    const scriptPath = path.join(process.cwd(), "scripts", "convert_pdf.py");

    // Execute the Python script for PDF to DOCX conversion
    const pythonProcess = spawn("python3", [scriptPath, pdfPath, docxPath]); // Ensure Python 3 is used

    return new Promise((resolve, reject) => {
      pythonProcess.on("close", async (code) => {
        if (code === 0) {
          // After successful conversion, read and process the DOCX file
          if (!fs.existsSync(docxPath)) {
            return reject(
              NextResponse.json(
                { error: "DOCX file was not generated" },
                { status: 500 }
              )
            );
          }

          try {
            const docxBuffer = fs.readFileSync(docxPath);

            // Extract text from DOCX using Mammoth
            const result = await mammoth.extractRawText({ buffer: docxBuffer });
            const content = result.value;

            // Summarize content using OpenAI
            const question =
              formData.get("question") || "Summarize this document.";

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
            console.error("Error during processing:", error);
            reject(
              NextResponse.json(
                { error: "Failed to process DOCX or summarize content" },
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

      // Capture errors from the Python process
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
