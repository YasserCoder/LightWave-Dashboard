function InputBox({
    label,
    value,
    setValue,
    width,
    theKey,
    type = "text",
    style = "",
}) {
    return (
        <div className={`flex flex-col gap-y-2.5 ${style}`}>
            <label className="font-semibold xs:font-extrabold capitalize">
                {label}
            </label>
            <input
                value={value === null ? "" : value}
                type={type}
                placeholder={label}
                className={`${width} px-4 py-1.5 bg-input border border-content text-sm xs:text-base outline-colored`}
                onChange={(e) => {
                    setValue((prevValue) => ({
                        ...prevValue,
                        [theKey]: e.target.value,
                    }));
                }}
            />
        </div>
    );
}

export default InputBox;
