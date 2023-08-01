import Input from "./Input";

const SearchInput = () => {
  return (
    <Input
      className="
        bg-gray-100/20
        placeholder:text-gray-400
        focus:placeholder:text-transparent
    "
      placeholder="What do you want to listen to ?"
    />
  );
};

export default SearchInput;
