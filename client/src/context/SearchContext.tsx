import {
  createContext,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";
import type { SearchItem } from "../constants/searchOptions";

interface SearchContextInterface {
  search: SearchItem;
  setSearch: Dispatch<SetStateAction<SearchItem>>;
}

export const SearchContext = createContext<SearchContextInterface | undefined>(
  undefined
);

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [search, setSearch] = useState<SearchItem>("iphone");

  return (
    <SearchContext.Provider value={{ search, setSearch }}>
      {children}
    </SearchContext.Provider>
  );
};
