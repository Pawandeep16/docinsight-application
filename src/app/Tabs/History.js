import axios from "axios";
import React, { useState } from "react";

function History({ summaries }) {
  const [historyChat, setHistoryChat] = useState([]);

  const getHistoryByTitle = async (title) => {
    // console.log(title);
    try {
      await axios
        .get(
          `https://backend101-two.vercel.app/api/summary/getQuestionsByTitle/${title}`
        )
        .then((data) => {
          setHistoryChat(data.data);
        });
    } catch (err) {
      console.log(err);
    }
  };

  console.log(historyChat.summary);

  return (
    <div className="xl:max-w-[80%] md:max-w-[80%] max-w-full mx-auto grid grid-cols-3 min-h-[500px]">
      <div className="col-span-1 bg-[#a4a9d1] h-full">
        {summaries?.map((item, i) => (
          <h1
            onClick={() => getHistoryByTitle(item.title)}
            className="px-2 py-4 text-lg font-normal cursor-pointer ml-5"
            key={i}
          >
            {item?.title}
          </h1>
        ))}
      </div>
      <div className="col-span-2 bg-[#233552]">
        {historyChat?.summary?.map((item, i) => (
          <div key={i} className=" px-4 space-y-4 py-4 w-full">
            <div className="w-full flex justify-end ">
              <p className="max-w-[250px] bg-gray-400 px-4 py-2 rounded-md">
                {item.question}
              </p>
            </div>
            <div className="w-full flex justify-start ">
              <p className="max-w-[500px] bg-blue-500 px-4 py-2 rounded-md">
                {item.answer}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default History;
