function SelectBox({
    value,
    label,
    setValue,
    theKey,
    style = "",
    width,
    children,
}) {
    return (
        <div className={`flex flex-col gap-y-2.5 ${width}`}>
            <label className="font-semibold xs:font-extrabold capitalize">
                {label}
            </label>
            <select
                value={value}
                onChange={(e) => {
                    setValue((prevValue) => ({
                        ...prevValue,
                        [theKey]: e.target.value,
                    }));
                }}
                className={`w-full ${style} px-4 py-1.5 bg-input border border-content text-sm xs:text-base outline-colored`}
            >
                {children}
            </select>
        </div>
    );
}

export default SelectBox;
