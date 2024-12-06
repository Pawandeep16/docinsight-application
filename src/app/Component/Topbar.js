import React from "react";

function Topbar({ activeTab, setActiveTab }) {
  const tabs = ["Summarization", "Q&A", "History"];

  return (
    <div className="xl:max-w-[80%] md:max-w-[50%] max-w-full mx-auto bg-[#1d2146] flex  items-center justify-around px-1 py-2">
      {tabs.map((item, i) => (
        <h1
          key={i}
          onClick={() => setActiveTab(item)}
          className={`hover:bg-[#233552] min-w-[30%] rounded-md cursor-pointer text-center text-white py-1 px-3  text-lg ${
            activeTab === item && "font-semibold bg-[#233552]"
          }`}
        >
          {item}
        </h1>
      ))}
    </div>
  );
}

export default Topbar;
