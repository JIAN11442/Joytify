import Box from "@/components/Box";
import { ClipLoader } from "react-spinners";

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
      <ClipLoader size={50} color="#00fd0a" />
    </Box>
  );
};

export default Loading;
