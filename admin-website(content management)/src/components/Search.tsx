type SearchProps = {
  value: string | undefined;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Search = ({ value, onChange }: SearchProps) => {
  return (
    <div className="max-w-96 rounded-md xsm:w-26">
      <input type="text" placeholder="Search a product" value={value} onChange={onChange} />
    </div>
  );
};

export default Search;
