import { useGetMessages } from "../hook/message/useGetMessages";
import { useUser } from "../hook/auth/useUser";
import { TABLE_PAGE_SIZE } from "../utils/constants";

import SelectMessage from "../features/inbox/SelectMessage";
import Modal from "../ui/Modal";
import Loader from "../ui/Loader";
import InboxForm from "../features/inbox/InboxForm";
import MessageTable from "../features/inbox/MessageTable";
import Pagination from "../ui/Pagination";

import { FaPlus } from "react-icons/fa6";

function Inbox() {
    const { isLoading, user } = useUser();
    const {
        isLoading: isGetting,
        messages,
        count,
    } = useGetMessages(TABLE_PAGE_SIZE, user.email);

    if (isLoading) return <Loader />;
    return (
        <div className="container py-7 flex flex-col gap-y-[30px] overflow-x-hidden">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl xs:text-4xl md:text-5xl font-extrabold capitalize">
                    Inbox
                </h1>
                <div>
                    <Modal>
                        <Modal.Open opens="message-form">
                            <button className="py-1.5 xs:py-2 px-2.5 xs:px-4 flex items-center gap-x-1 xs:gap-x-2 rounded-full text-gray-950 bg-yellow-200 shadow-lg">
                                <FaPlus className="text-sm xs:text-base" />
                                <span className="capitalize text-sm xs:text-base font-semibold">
                                    send new message
                                </span>
                            </button>
                        </Modal.Open>
                        <Modal.Window name="message-form">
                            <InboxForm user={user} />
                        </Modal.Window>
                    </Modal>
                </div>
            </div>
            <SelectMessage />
            {isGetting ? (
                <Loader />
            ) : (
                <>
                    <MessageTable messages={messages} />
                    <Pagination count={count} pageSize={TABLE_PAGE_SIZE} />
                </>
            )}
        </div>
    );
}

export default Inbox;
