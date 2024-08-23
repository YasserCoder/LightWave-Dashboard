import { useSearchParams } from "react-router-dom";

function SelectDuration() {
    const [searchParams, setSearchParams] = useSearchParams();
    const last = searchParams.get("last") || "7";
    return (
        <select
            value={last}
            className="p-1 cursor-pointer capitalize xs:text-lg bg-transparent outline-none"
            onChange={(e) => {
                searchParams.set("last", e.target.value);
                setSearchParams(searchParams);
            }}
        >
            <option value="7" className="bg-input">
                this week
            </option>
            <option value="30" className="bg-input">
                this month
            </option>
            <option value="90" className="bg-input">
                this quarter
            </option>
        </select>
    );
}

export default SelectDuration;
