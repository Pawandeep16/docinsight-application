import React from "react";

function Card({ icon, head, desc }) {
  return (
    <div className="p-4 space-y-4 flex flex-col items-center justify-center max-w-[300px] bg-[#1f3e57] rounded-xl cursor-pointer hover:shadow-2xl hover:scale-95 transition-transform duration-500 ease-in-out">
      <h2 className="text-2xl h-10 w-10 flex items-center justify-center rounded-full bg-[#f5f5f5]">
        {icon}
      </h2>
      <p className="text-[#f5f5f5] text-xl">{head}</p>
      <p className="text-gray-400 text-lg text-center ">{desc}</p>
    </div>
  );
}

export default Card;
