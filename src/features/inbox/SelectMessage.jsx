import SortBy from "../../ui/SortBy";

function SelectMessage() {
    return (
        <div className="flex sm:items-center gap-2 flex-col sm:flex-row border border-content rounded-md px-2 py-1 shadow-md w-fit text-sm sm:text-base">
            <div className="flex items-center justify-between xs:gap-2">
                <p className="capitalize font-semibold ">
                    <span>** source :</span>
                </p>
                <SortBy
                    name={"source"}
                    options={[
                        {
                            value: "",
                            label: "ALL",
                        },
                        {
                            value: "client",
                            label: "Clients",
                        },
                        {
                            value: "admin",
                            label: "Admins",
                        },
                    ]}
                />
            </div>
            <span className="h-10 w-[2px] bg-content hidden sm:block"></span>
            <div className="flex items-center justify-between xs:gap-2">
                <p className="capitalize font-semibold">
                    <span>** messages :</span>
                </p>
                <SortBy
                    name={"read"}
                    options={[
                        { value: "", label: "All" },
                        { value: "true", label: "Read" },
                        { value: "false", label: "UnRead" },
                    ]}
                />
            </div>
        </div>
    );
}

export default SelectMessage;
