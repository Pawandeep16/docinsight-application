"use client";
import Header from './Component/Header';
import UploadVideo from './Component/UplaodVideo';
import Topbar from './Component/Topbar.js';
import Questions from './Tabs/Questions';
import Summarization from './Tabs/Summarization';
import History from './Tabs/History';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Homepage from './Component/Homepage'
import { useSession } from 'next-auth/react';
import { json } from 'stream/consumers';


export default function Home() {


  type Chat = {
    question: string;
    answer: string;
  };

  interface Token {
    id: string;
    email: string;
    token: string; // Assuming you also store the token in the state
  }

  const { data: session, status } = useSession();

  console.log(session);

  const [selected, setSelected] = useState("Summarization");
  const [activeQuestion, setActiveQuestion] = useState("");
  const [summary, setSummary] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [myChat, setMyChat] = useState<Chat[]>([]);
  const [title, setTitle] = useState("")
  const [token, setToken] = useState<Token | null>(null);
  const [summaries, setSummaries] = useState([])


  const handleFileUpload = async () => {
    if (!file) {
      alert("No file selected");
      return;
    }
    const myFileExtention = file.name.split(".")[1];
    if (myFileExtention === "pdf") {
      const formData = new FormData();
      formData.append("pdfFile", file); // Attach the selected PDF file
      formData.append("question", activeQuestion); // Pass the question to the backend directly

      try {
        // Show loading indicator
        setLoading(true);

        // Step 1: Convert PDF to DOCX and Summarize in one step
        const response = await axios.post(
          "http://localhost:3000/api/convert",
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        // Extract summary from the response
        const summary = response.data.summary;
        console.log("Summary received:", summary);

        // Update the UI with the summary
        setSummary(summary);
        setMyChat((d) => [
          ...d,
          { question: activeQuestion, answer: summary },
        ]);
      } catch (error) {
        console.error("Error during conversion and summarization:", error);
        alert("An error occurred. Please try again.");
      } finally {
        // Hide loading indicator
        setLoading(false);
      }
    }
    else if (myFileExtention === "jpg") {
      const formData = new FormData();
      formData.append("imageFile", file); // Attach the selected PDF file
      formData.append("Text", activeQuestion);

      try {
        // Show loading indicator
        setLoading(true);

        // Step 1: Convert PDF to DOCX and Summarize in one step
        const response = await axios.post(
          "http://localhost:3000/api/image-to-docx",
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        // Extract summary from the response
        const summary = response.data.summary;
        console.log("Summary received:", summary);

        // Update the UI with the summary
        setSummary(summary);
        setMyChat((d) => [
          ...d,
          { question: activeQuestion, answer: summary },
        ]);
      } catch (error) {
        console.error("Error during conversion and summarization:", error);
        alert("An error occurred. Please try again.");
      } finally {
        // Hide loading indicator
        setLoading(false);
      }
    }
    else {
      setLoading(true); // Show loading state
      try {
        // Prepare form data
        const formData = new FormData();
        formData.append("file", file); // Key should match what backend expects
        formData.append("question", activeQuestion); // Replace with actual question if needed

        // Send the file as form data to the backend API
        const response = await axios.post(
          "http://localhost:3000/api/summarize",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data", // Important for file uploads
            },
          }
        );
        // Set the returned summary if present
        setSummary(response.data.summary);
        setMyChat((d) => [
          ...d,
          { question: activeQuestion, answer: response.data.summary },
        ]);
      } catch (error) {
        console.error("Error summarizing document:", error);
      } finally {
        setLoading(false); // Hide loading state
      }
    }
  };


  const getSummaries = async () => {
    try {
      await axios.get('https://backend101-two.vercel.app/api/summary/getSummaries').then((data) => {
        setSummaries(data.data);
      })
    } catch (err) {
      console.log(err);
    }
  }


  useEffect(() => {
    const myToken = localStorage.getItem("user");

    console.log(myToken);
    if (myToken) {
      setToken(JSON.parse(myToken)); // Set the token as the correct type
    }
    getSummaries()
  }, [])


  const handleSaveChat = async () => {
    try {
      // Create a new FormData object
      const formData = new FormData();

      // Append text fields
      formData.append("title", title); // Append title
      formData.append("userId", token?.id || ''); // Append user ID
      formData.append("summary", JSON.stringify(myChat)); // Append summary as a JSON string

      // Append the file (if available)
      if (file) {
        formData.append("file", file); // Append file
      }

      // Make the API request
      await axios.post("https://backend101-two.vercel.app/api/summary/saveSummary", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Set content type
        },
      });

      // Reset states on success
      setActiveQuestion("");
      setFile(null);
      setMyChat([]);
    } catch (err) {
      console.error("Error saving chat:", err);
    }
  };

  const getTab = (selectedTab: string) => {
    switch (selectedTab) {
      case "Q&A":
        return (
          <Questions
            setInput={setActiveQuestion}
            handleFileUpload={handleFileUpload}
            save={handleSaveChat}
            myChat={myChat}
            setTitle={setTitle}
          />
        );
      case "Summarization":
        return (
          <Summarization
            handleFileUpload={handleFileUpload}
            save={handleSaveChat}
            getSummary={summary}
            activeQuestion={activeQuestion}
            setActiveQuestion={setActiveQuestion}
          />
        );
      case "History":
        return <History
          summaries={summaries} />;
      default:
        return <div>Select a valid tab</div>;
    }
  };



  const SelectedTab = getTab(selected);

  return (
    <>
      {status === "authenticated" || token?.id ? (
        <div className="scroll-smooth">
          <Header />
          <div className="flex w-full">
            <div className="absolute inset-0 bg-gradient-to-b from-[#1f3e57] via-white/20 to-white opacity-100"></div>
            <div className="mt-5 flex-1 pr-5 space-y-4 z-20">
              <UploadVideo
                selectedFile={file}
                setSelectedFile={setFile}
                loading={loading}
              />
              <Topbar activeTab={selected} setActiveTab={setSelected} />
              {SelectedTab}
            </div>
          </div>
        </div>
      ) : (
        <Homepage />
      )}
    </>
  );
}