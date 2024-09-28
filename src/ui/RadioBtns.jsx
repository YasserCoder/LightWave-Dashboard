import styles from "./radios.module.css";

function RadioBtns({ value, setValue, options, style }) {
    const handleOptionChange = (event) => {
        setValue(event.target.value);
    };

    return (
        <div className={style}>
            {options.map((option, index) => {
                return (
                    <label className={styles.label} key={index}>
                        <input
                            type="radio"
                            name="radio"
                            value={option}
                            checked={value === option}
                            onChange={handleOptionChange}
                            className={styles.input}
                        />
                        <span
                            className={`${styles.radioText} ${
                                value === option ? styles.selected : ""
                            }`}
                        >
                            {option}
                        </span>
                    </label>
                );
            })}
        </div>
    );
}

export default RadioBtns;
