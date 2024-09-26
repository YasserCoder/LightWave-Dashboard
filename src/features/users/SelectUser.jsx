import SortBy from "../../ui/SortBy";

function SelectUser() {
    return (
        <div className=" border border-content rounded-md px-2 py-1 shadow-md w-fit text-sm sm:text-base">
            <div className="flex items-center justify-between xs:gap-2">
                <p className="capitalize font-semibold ">
                    <span>** Role :</span>
                </p>
                <SortBy
                    name={"role"}
                    options={[
                        {
                            value: "",
                            label: "ALL",
                        },
                        {
                            value: "user",
                            label: "Users",
                        },
                        {
                            value: "admin",
                            label: "Admins",
                        },
                    ]}
                />
            </div>
        </div>
    );
}

export default SelectUser;
