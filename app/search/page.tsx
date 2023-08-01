import Header from "@/components/Header";
import SearchInput from "@/components/SearchInput";

const Search = () => {
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
      <Header className="from-blue-900">
        <div
          className="
            flex
            flex-col
            mb-2
            gap-y-6
          "
        >
          <h1
            className="
              text-3xl
              text-white
              font-semibold
            "
          >
            Search
          </h1>
          <SearchInput />
        </div>
      </Header>
    </div>
  );
};

export default Search;
