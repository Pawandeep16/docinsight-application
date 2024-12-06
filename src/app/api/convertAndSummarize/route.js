import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { spawn } from "child_process";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("pdfFile");
    const outputFileName = formData.get("outputFileName");
    const question = formData.get("question");

    if (!file || !outputFileName) {
      return NextResponse.json(
        { error: "PDF file and output file name are required" },
        { status: 400 }
      );
    }

    // Define the `uploads` directory
    const uploadsDir = path.join(process.cwd(), "uploads");

    // Ensure the `uploads` directory exists
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    // Define the file paths
    const pdfPath = path.join(uploadsDir, file.name);
    const wordPath = path.join(uploadsDir, outputFileName);

    // Save the PDF file to the server
    const fileStream = fs.createWriteStream(pdfPath);
    const fileBuffer = await file.arrayBuffer();
    fileStream.write(Buffer.from(fileBuffer));
    fileStream.end();

    // Execute Python script for conversion
    const scriptPath = path.join(process.cwd(), "scripts", "convert_pdf.py");
    const pythonProcess = spawn("python", [scriptPath, pdfPath, wordPath]);

    // Collect Python script output
    // let pythonOutput = "";
    // pythonProcess.stdout.on("data", (data) => {
    //   pythonOutput += data.toString();
    // });

    pythonProcess.stderr.on("data", (data) => {
      console.error("Python script error:", data.toString());
    });

    pythonProcess.on("close", async (code) => {
      if (code !== 0) {
        return NextResponse.json(
          { error: "Python script execution failed" },
          { status: 500 }
        );
      }

      // Now, handle the summarization
      const summarizeScriptPath = path.join(
        process.cwd(),
        "scripts",
        "summarize.py"
      );
      const summarizeProcess = spawn("python", [
        summarizeScriptPath,
        wordPath,
        question,
      ]);

      let summaryOutput = "";
      summarizeProcess.stdout.on("data", (data) => {
        summaryOutput += data.toString();
      });

      summarizeProcess.stderr.on("data", (data) => {
        console.error("Python summarize script error:", data.toString());
      });

      summarizeProcess.on("close", (code) => {
        if (code === 0) {
          return NextResponse.json(
            {
              message: "Conversion and summarization successful",
              summary: summaryOutput,
            },
            { status: 200 }
          );
        } else {
          return NextResponse.json(
            { error: "Python summarization script execution failed" },
            { status: 500 }
          );
        }
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
