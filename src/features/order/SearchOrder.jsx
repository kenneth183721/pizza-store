import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchOrder() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!query) return;
    navigate(`/order/${query}`);
    setQuery("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Search order #"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-32 rounded-md bg-yellow-100 px-3 py-2 text-sm placeholder-stone-500 focus:ring focus:ring-yellow-300 focus:outline-none sm:w-64 sm:focus:w-72 transition-all duration-300 focus:opacity-70"
      />
    </form>
  );
}

export default SearchOrder;
