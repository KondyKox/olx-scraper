import {
  createContext,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";
import type { DirectionType, SortByType } from "../types/SortProps";

interface SortContextInterface {
  sortBy: SortByType;
  setSortBy: Dispatch<SetStateAction<SortByType>>;
  direction: DirectionType;
  setDirection: Dispatch<SetStateAction<DirectionType>>;
}

export const SortContext = createContext<SortContextInterface | undefined>(
  undefined
);

export const SortProvider = ({ children }: { children: ReactNode }) => {
  const [sortBy, setSortBy] = useState<SortByType>("price");
  const [direction, setDirection] = useState<DirectionType>("asc");

  return (
    <SortContext.Provider
      value={{ sortBy, setSortBy, direction, setDirection }}
    >
      {children}
    </SortContext.Provider>
  );
};
