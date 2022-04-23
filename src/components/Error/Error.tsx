import styles from "./error.module.scss";

export function Error() {
  return (
    <div className={styles.errorContainer}>
      <div>
        <h1>Oh no!</h1>
        <p>An unexpected error occurred. Please reload the page or try again.</p>
      </div>
    </div>
  );
}
