import FormBtn from "./FormBtn";
import MiniLoader from "./MiniLoader";

function BottomForm({ handleSubmit, onReset, error, isLoading, label }) {
    return (
        <div
            className={`flex flex-col gap-y-4 sm:flex-row ${
                error ? "sm:justify-between" : "justify-end"
            } sm:items-center w-full border-t border-content mt-2 pt-4 pb-2`}
        >
            {error && <p className="text-red-500 ">{`** ${error}`}</p>}
            <div className="flex gap-3 items-center self-end flex-wrap">
                {isLoading && <MiniLoader />}
                <FormBtn
                    type={"reset"}
                    label={"cancel"}
                    onClick={onReset}
                    disabled={isLoading}
                />
                <FormBtn
                    type={"submit"}
                    label={label}
                    onClick={handleSubmit}
                    disabled={isLoading}
                />
            </div>
        </div>
    );
}

export default BottomForm;
