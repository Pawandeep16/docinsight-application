"use client";
import axios from "axios";
import React, { useState } from "react";

const FileProcessor = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file); // Store the selected file
      console.log("File selected:", file);
    } else {
      console.log("No file selected");
    }
  };

  const handleConvert = async () => {
    if (!selectedFile) {
      alert("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("pdfFile", selectedFile); // Attach the selected file
    formData.append("outputFileName", "output.docx"); // Desired output file name

    try {
      await axios
        .post("http://localhost:3000/api/convert", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((data) => {
          console.log(data);
        });
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred.");
    }
  };

  return (
    <div>
      <h1>PDF to DOCX Converter</h1>
      <input type="file" accept=".pdf" onChange={handleFileChange} />
      <button onClick={handleConvert}>Convert to DOCX</button>
    </div>
  );
};

export default FileProcessor;
