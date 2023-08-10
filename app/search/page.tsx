import getSongsByTitle from "@/actions/getSongsByTitle";
import Header from "@/components/Header";
import SearchInput from "@/components/SearchInput";
import SearchContent from "./components/SearchContent";

interface SearchProps {
  searchParams: {
    title: string;
  };
}
const Search = async ({ searchParams }: SearchProps) => {
  const songsByTitle = await getSongsByTitle(searchParams.title, "search");
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
      <SearchContent songsByTitle={songsByTitle} />
    </div>
  );
};

export default Search;
