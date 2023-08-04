import styles from "./footer.module.scss";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <p>
        Not affiliated with DPG Media B.V. Created by{" "}
        <a target="_blank" rel="noopener noreferrer" href="https://casperiv.dev">
          Dev-CasperTheGhost
        </a>
      </p>
    </footer>
  );
}
