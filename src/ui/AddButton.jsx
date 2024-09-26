import { FaPlus } from "react-icons/fa6";

function AddButton({ label }) {
    return (
        <button className="py-1.5 xs:py-2 px-2.5 xs:px-4 flex items-center gap-x-1 xs:gap-x-2 rounded-full text-gray-950 bg-yellow-200 shadow-lg">
            <FaPlus className="text-sm xs:text-base" />
            <span className="capitalize text-sm xs:text-base font-semibold hidden xxs:block">
                {label}
            </span>
        </button>
    );
}

export default AddButton;
