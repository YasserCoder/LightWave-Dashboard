function FormBtn({ onClick, type, label, disabled }) {
    return (
        <button
            type={type}
            className={`capitalize font-semibold py-1 px-2 xs:text-lg xs:py-1.5 xs:px-5 rounded-lg disabled:bg-opacity-30 disabled:cursor-not-allowed ${
                type === "submit"
                    ? "bg-colored text-white hover:bg-sky-600"
                    : "bg-transparent border border-content hover:bg-main hover:text-bkg-main"
            }`}
            onClick={onClick}
            disabled={disabled}
        >
            {label}
        </button>
    );
}

export default FormBtn;
