import { useSort } from "../hooks/useSort";
import styles from "../styles/SortPanel.module.css";
import type { DirectionType, SortByType } from "../types/SortProps";

const SortPanel = () => {
  const { setDirection, setSortBy } = useSort();

  return (
    <div className={styles.panel_container}>
      <div className={styles.sort_wrapper}>
        <label htmlFor="sortBy">Kryterium</label>
        <select
          name="sortBy"
          id="sortBy"
          onChange={(e) => setSortBy(e.target.value as SortByType)}
        >
          <option value="price">Cena</option>
          <option value="date">Data</option>
        </select>
      </div>
      <div className={styles.sort_wrapper}>
        <label htmlFor="direction">Kierunek</label>
        <select
          name="direction"
          id="direction"
          onChange={(e) => setDirection(e.target.value as DirectionType)}
        >
          <option value="asc">Rosnąco</option>
          <option value="desc">Malejąco</option>
        </select>
      </div>
    </div>
  );
};

export default SortPanel;
