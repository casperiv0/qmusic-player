import styles from "./footer.module.scss";

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>
        Not affiliated with Q-Music. Created by{" "}
        <a target="_blank" rel="noopener noreferrer" href="https://caspertheghost.me">
          Dev-CasperTheGhost
        </a>
      </p>
    </footer>
  );
};
