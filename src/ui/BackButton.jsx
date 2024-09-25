import { useMoveBack } from "../hook/useMoveBack";

import { FaArrowLeft } from "react-icons/fa";

function BackButton() {
    const moveBack = useMoveBack();
    return (
        <button
            onClick={moveBack}
            className="text-2xl flex items-center gap-2 hover:text-content font-semibold capitalize self-start"
        >
            <FaArrowLeft /> <span>Back</span>
        </button>
    );
}

export default BackButton;
