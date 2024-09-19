import styles from "./radios.module.css";

const options = ["pending", "confirmed", "shipped", "delivred", "cancelled"];

function RadioBtns({ value, setValue }) {
    const handleOptionChange = (event) => {
        setValue(event.target.value);
    };

    return (
        <div
            className={
                "flex flex-col xs:flex-row gap-x-2 xs:flex-wrap my-4 self-center"
            }
        >
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
