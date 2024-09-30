import { format } from "date-fns";
import { useLocation } from "react-router-dom";

import { useUserDetails } from "../../hook/user/useUserDetails";

import BackButton from "../../ui/BackButton";
import Loader from "../../ui/Loader";
import Main from "../../ui/Main";

function UserDetails() {
    const location = useLocation();
    const pathSegments = location.pathname.split("/").filter(Boolean);
    const userId = pathSegments[pathSegments.length - 1];

    const { isLoading, userInfo } = useUserDetails(userId);
    return (
        <Main>
            <BackButton />
            {isLoading ? (
                <Loader />
            ) : (
                <>
                    <div className="flex justify-between items-center mt-3 ">
                        <h1 className="text-2xl xs:text-4xl lg:text-6xl font-bold capitalize">
                            {`User Info`}
                        </h1>

                        <div
                            className={`self-end uppercase py-0.5 lg:py-1 px-2 xs:px-4 lg:px-6 rounded-full text-xs xs:text-sm lg:text-lg shadow-md font-bold ${
                                userInfo.authority === "user"
                                    ? "bg-green-300 text-green-700 border-2 border-green-700"
                                    : userInfo.authority === "admin"
                                    ? "bg-red-300 text-red-700 border-2 border-red-700"
                                    : ""
                            }`}
                        >
                            {userInfo.authority}
                        </div>
                    </div>
                    <div className="flex justify-between items-center mt-5">
                        <div className="flex gap-2 items-center">
                            <div
                                className={`capitalize text-xl xs:text-3xl size-10 xs:size-12 flex justify-center items-center rounded-full text-white bg-orange-400`}
                            >
                                {userInfo.avatar !== null ? (
                                    <img
                                        src={userInfo.avatar}
                                        alt="avatar"
                                        className="h-full w-full object-cover rounded-full"
                                    />
                                ) : (
                                    <span>{userInfo.name.charAt(0)}</span>
                                )}
                            </div>

                            <div>
                                <p className="font-semibold xs:font-bold text-xl xs:text-2xl capitalize">
                                    {userInfo.name}
                                </p>
                                <p className="text-xs xs:text-sm flex gap-x-1 sm:hidden">
                                    <span className="capitalize">
                                        joined at :
                                    </span>
                                    <span className="font-light">
                                        {format(
                                            new Date(userInfo.created_at),
                                            "dd MMM yyyy"
                                        )}
                                    </span>
                                </p>
                            </div>
                        </div>
                        <p className="text-sm sm:flex gap-x-1 hidden ">
                            <span className="capitalize">joined at :</span>
                            <span className="font-light">
                                {format(
                                    new Date(userInfo.created_at),
                                    "dd MMM yyyy"
                                )}
                            </span>
                        </p>
                    </div>
                    <div className="mt-5 xs:mt-8 flex flex-col items-center gap-y-5 ">
                        <div className="flex items-center xs:justify-center gap-5 flex-wrap">
                            <Info label={"email"} content={userInfo.email} />
                            <Info label={"phone"} content={userInfo.phone} />
                        </div>
                        <div className="flex items-center xs:justify-center gap-5 flex-wrap text-center">
                            <Info
                                label={"country"}
                                content={userInfo.country}
                            />
                            <Info label={"city"} content={userInfo.city} />
                            <Info label={"adress"} content={userInfo.adress} />
                            <Info
                                label={"post code"}
                                content={userInfo.postCode}
                            />
                        </div>
                    </div>
                </>
            )}
        </Main>
    );
}
function Info({ label, content }) {
    return (
        <p className="flex gap-2 items-center flex-wrap text-sm xs:text-lg">
            <span className="font-bold capitalize">{label} :</span>
            <span className="">{content}</span>
        </p>
    );
}

export default UserDetails;
