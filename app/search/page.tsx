import getSongsByTitle from "@/actions/getSongsByTitle";
import Header from "@/components/Header";
import SearchInput from "@/components/SearchInput";
import SearchContent from "./components/SearchContent";
import SoundWave from "@/components/SoundWave";

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
        <div
          className="
            flex
            flex-col
            gap-y-4        
        "
        >
          {/* Search Title */}
          <div className="mt-4 flex gap-x-4 items-center">
            <p className="text-3xl font-semibold">Search</p>
          </div>
          {/* Search Bar */}
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
