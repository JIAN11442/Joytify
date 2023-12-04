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
  const songsByTitle = await getSongsByTitle(searchParams.title);

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
      <Header
        className="
          from-blue-900
        "
      >
        {/* Search Title */}
        <div className="mb-2">
          <h1 className="text-3xl font-semibold text-white">Search</h1>
        </div>
        {/* Search Bar */}
        <div className="mt-4">
          <SearchInput searchParams={searchParams} />
        </div>
      </Header>

      <div
        className="
          flex
          flex-col
          w-full
          h-full
          px-6
        "
      >
        <SearchContent songs={songsByTitle} />
      </div>
    </div>
  );
};

export default Search;
