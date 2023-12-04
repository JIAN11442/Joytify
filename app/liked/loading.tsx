"use client";

import { ClipLoader } from "react-spinners";

import Box from "@/components/Box";

const Loading = () => {
  return (
    <Box
      className="
        flex
        h-full
        items-center
        justify-center
      "
    >
      <div
        className="
          flex
          flex-col
          items-center
          justify-center
        "
      >
        <ClipLoader size={55} color="#22c55e" />
        <p
          className="
            text-[#22c55e]
          "
        >
          Loading
        </p>
      </div>
    </Box>
  );
};

export default Loading;
