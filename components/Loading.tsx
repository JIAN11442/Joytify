import { ClipLoader } from "react-spinners";

interface LoadingProps {
  title: string;
  description: string;
}

const Loading: React.FC<LoadingProps> = ({ title, description }) => {
  return (
    <div
      className="
        fixed
        inset-0
        bg-neutral-800/80
        flex
        flex-col
        gap-y-2
        items-center
        justify-center
    "
    >
      <ClipLoader size={50} color="green" />
      <div className={`text-center text-[#22c55e] text-opacity-80`}>
        <div>{title}</div>
        <div>{description}</div>
      </div>
    </div>
  );
};

export default Loading;
