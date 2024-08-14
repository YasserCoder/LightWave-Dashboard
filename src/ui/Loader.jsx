import styles from "./loader.module.css";
function Loader() {
    return (
        <div id={styles.page}>
            <div id={styles.container}>
                <div id={styles.ring}></div>
                <div id={styles.ring}></div>
                <div id={styles.ring}></div>
                <div id={styles.ring}></div>
                <div className="font-semibold">Loading</div>
            </div>
        </div>
    );
}

export default Loader;
