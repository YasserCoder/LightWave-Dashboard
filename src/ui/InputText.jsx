import { useState } from "react";

function InputText({ value, setValue, label, type, children, width }) {
    const [isFocused, setIsFocused] = useState(false);
    return (
        <div
            className={`flex gap-x-2 sm:gap-x-4 items-center py-2 md:py-2.5 px-3 rounded-full ${
                isFocused
                    ? "outline outline-[3px] outline-colored"
                    : "border border-content"
            } bg-input`}
        >
            {children}
            <input
                value={value}
                type={type}
                placeholder={label}
                className={`${width} bg-input outline-none text-sm xs:text-base`}
                onChange={(e) => setValue(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
            />
        </div>
    );
}

export default InputText;
