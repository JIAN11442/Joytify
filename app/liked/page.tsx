import Header from "@/components/Header";

const LikedSongs = () => {
  return (
    <div
      className="
        w-full
        h-full
        bg-neutral-900
        rounded-lg
        overflow-hidden
        overflow-y-auto
    "
    >
      <Header className="from-violet-600">
        <div>LIKESONGS</div>
      </Header>
    </div>
  );
};

export default LikedSongs;
