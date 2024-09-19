import { useSearchParams } from "react-router-dom";

function SortBy({ options, name }) {
    const [searchParams, setSearchParams] = useSearchParams();
    const sortBy = searchParams.get(name) || options?.at(0)?.label;

    function handleChange(e) {
        searchParams.set(name, e.target.value);
        setSearchParams(searchParams);
    }

    return (
        <select
            value={sortBy}
            onChange={handleChange}
            className="py-2 px-1 font-bold bg-transparent outline-none capitalize cursor-pointer max-w-[120px] xs:max-w-none md:max-w-[170px] lg:max-w-none"
        >
            {options.map((option) => (
                <option
                    value={option.value}
                    key={option.value}
                    className="capitalize bg-input"
                >
                    {option.label}
                </option>
            ))}
        </select>
    );
}

export default SortBy;
