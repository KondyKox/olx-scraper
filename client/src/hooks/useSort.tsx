import { useContext } from "react";
import { SortContext } from "../context/SortContext";

export const useSort = () => {
  const ctx = useContext(SortContext);
  if (!ctx) throw new Error("useSort must be used within SortProvider!");
  return ctx;
};
