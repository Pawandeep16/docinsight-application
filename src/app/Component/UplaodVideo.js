"use client";
import React, { useRef, useState } from "react";
import pdfIcon from "../Assets/icons/Pdficon.png";
import jpgIcon from "../Assets/icons/jpgIcon.png";
import wordIcon from "../Assets/icons/wordicon.png";
import Image from "next/image";
import uploadCloud from "../Assets/icons/uploadcloud.png";

function UplaodVideo({ selectedFile, setSelectedFile, loading }) {
  const filePickerRef = useRef(null);
  const [fileExtention, setFileExtention] = useState([]);

  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Get the selected file
    if (file) {
      setSelectedFile(file); // Store the selected file in state
      console.log("File selected:", file);
      setFileExtention(file.name.split("."));
    } else {
      console.log("No file selected");
    }
  };

  const getFileExtention = (selectedFileExtention) => {
    switch (selectedFileExtention) {
      case "docx":
        return <Image src={wordIcon} alt="" height={30} width={30} />;
      case "pdf":
        return <Image src={pdfIcon} alt="" height={30} width={30} />;
      case "jpg":
        return <Image src={jpgIcon} alt="" height={30} width={30} />;
      default:
        return;
    }
  };

  const myExtention = getFileExtention(fileExtention[1]);

  return (
    <div>
      <div className="bg-[#2e324c] p-4 xl:max-w-[80%] md:max-w-[50%] max-w-full mx-auto h-[200px] rounded-lg">
        <div className=" bg-[#222949] h-full text-white flex items-center justify-center rounded-md flex-col border border-dashed border-gray-400 relative space-y-2">
          {!selectedFile ? (
            <div className="space-y-4 flex flex-col items-center justify-center">
              <Image src={uploadCloud} alt="" height={70} width={70} />
              <button
                onClick={() => filePickerRef.current.click()}
                className="px-4 py-1 text-white bg-[#525672] rounded-lg text-lg mt-2"
              >
                Choose file
              </button>
            </div>
          ) : (
            <>
              {myExtention}
              <p>{selectedFile?.name}</p>
            </>
          )}

          <input
            type="file"
            className="hidden"
            ref={filePickerRef}
            onChange={handleFileChange}
          />
          {loading && <p className="text-white mt-4">Scanning document...</p>}
        </div>
      </div>
    </div>
  );
}

export default UplaodVideo;
