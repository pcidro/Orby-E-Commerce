import React, { useContext, type PropsWithChildren } from "react";

interface iSearchContext {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

const SearchContextUi = React.createContext<iSearchContext | null>(null);

export const Search = () => {
  const context = useContext(SearchContextUi);
  if (!context)
    throw new Error("useSearch deve estar dentro do SearchProvider");
  return context;
};

export const SearchProvider = ({ children }: PropsWithChildren) => {
  const [search, setSearch] = React.useState("");

  return (
    <SearchContextUi.Provider
      value={{
        search,
        setSearch,
      }}
    >
      {children}
    </SearchContextUi.Provider>
  );
};

export default Search;
