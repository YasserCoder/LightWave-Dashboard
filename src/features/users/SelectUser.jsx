import { FaFilter } from "react-icons/fa";
import SortBy from "../../ui/SortBy";

function SelectUser() {
    return (
        <div className="flex sm:items-center gap-2 flex-col sm:flex-row border border-content rounded-md px-2 py-1 shadow-md w-fit text-sm sm:text-base">
            <div className="flex items-center justify-between xs:gap-2">
                <p className="capitalize flex items-center font-semibold gap-2">
                    <FaFilter />
                    <span>Filtred by :</span>
                </p>
                <SortBy
                    name={"sortBy"}
                    options={[
                        {
                            value: "created_at-desc",
                            label: "Date : Newest",
                        },
                        {
                            value: "created_at-asc",
                            label: "Date : Oldest",
                        },
                        {
                            value: "name-asc",
                            label: "Name : A-Z ",
                        },
                        {
                            value: "name-desc",
                            label: "Name : Z-A ",
                        },
                    ]}
                />
            </div>
            <span className="h-10 w-[2px] bg-content hidden sm:block"></span>
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
