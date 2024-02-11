import Icon from "../Common/Icon";

function Searchbar({ value, onSearch, className }) {
  return (
    <div className="mr-[5%]">
      <input
        type="text"
        className={`py-2 px-4 order-[--secondary-color] focus:outline-none border-2 rounded-lg ${className}`}
        placeholder="Search"
        value={value}
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
}

export default Searchbar;
