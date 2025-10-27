import styles from "../styles/HeaderLogo.module.css";

const HeaderLogo = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={styles.icon}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-4.35-4.35M17.65 10.83A6.83 6.83 0 104.83 17.65 6.83 6.83 0 0017.65 10.83z"
          />
        </svg>
        <h1 className={styles.title}>
          OLX<span>Scraper</span>
        </h1>
      </div>

      <p className={styles.tagline}>Automatycznie łowi oferty 🕵️‍♂️</p>
    </header>
  );
};

export default HeaderLogo;
