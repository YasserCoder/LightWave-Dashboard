import styles from "./miniLoader.module.css";

function MiniLoader() {
    return (
        <div className={styles.spinner}>
            <div className={` ${styles.center}`}>
                <div className={styles.spinnerBlade}></div>
                <div className={styles.spinnerBlade}></div>
                <div className={styles.spinnerBlade}></div>
                <div className={styles.spinnerBlade}></div>
                <div className={styles.spinnerBlade}></div>
                <div className={styles.spinnerBlade}></div>
                <div className={styles.spinnerBlade}></div>
                <div className={styles.spinnerBlade}></div>
                <div className={styles.spinnerBlade}></div>
                <div className={styles.spinnerBlade}></div>
                <div className={styles.spinnerBlade}></div>
                <div className={styles.spinnerBlade}></div>
            </div>
        </div>
    );
}

export default MiniLoader;
