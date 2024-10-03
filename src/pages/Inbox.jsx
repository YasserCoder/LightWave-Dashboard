import { useGetMessages } from "../hook/message/useGetMessages";
import { useUser } from "../hook/auth/useUser";
import { TABLE_PAGE_SIZE } from "../utils/constants";

import SelectMessage from "../features/inbox/SelectMessage";
import Modal from "../ui/Modal";
import Loader from "../ui/Loader";
import InboxForm from "../features/inbox/InboxForm";
import MessageTable from "../features/inbox/MessageTable";
import Pagination from "../ui/Pagination";
import Main from "../ui/Main";
import MainHeader from "../ui/MainHeader";
import AddButton from "../ui/AddButton";

function Inbox() {
    const { isLoading, user } = useUser();
    const {
        isLoading: isGetting,
        messages,
        count,
    } = useGetMessages(TABLE_PAGE_SIZE, user?.email);

    if (isLoading) return <Loader />;
    return (
        <Main>
            <MainHeader title={"inbox"}>
                <Modal>
                    <Modal.Open opens="message-form">
                        <div>
                            <AddButton label={"send new message"} />
                        </div>
                    </Modal.Open>
                    <Modal.Window name="message-form">
                        <InboxForm user={user} />
                    </Modal.Window>
                </Modal>
            </MainHeader>

            <SelectMessage />
            {isGetting ? (
                <Loader />
            ) : (
                <>
                    <MessageTable messages={messages} />
                    <Pagination count={count} pageSize={TABLE_PAGE_SIZE} />
                </>
            )}
        </Main>
    );
}

export default Inbox;
