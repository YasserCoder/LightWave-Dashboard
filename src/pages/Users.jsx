import { useUser } from "../hook/auth/useUser";
import { useGetUsers } from "../hook/user/useGetUsers";
import { TABLE_PAGE_SIZE } from "../utils/constants";

import SelectUser from "../features/users/SelectUser";
import UserForm from "../features/users/UserForm";
import AddButton from "../ui/AddButton";
import Main from "../ui/Main";
import MainHeader from "../ui/MainHeader";
import Modal from "../ui/Modal";
import Loader from "../ui/Loader";
import UserTable from "../features/users/UserTable";
import Pagination from "../ui/Pagination";

function Users() {
    const { isLoading, user } = useUser();
    const {
        isLoading: isGetting,
        users,
        count,
    } = useGetUsers(TABLE_PAGE_SIZE, user.email);

    if (isLoading) return <Loader />;
    return (
        <Main>
            <MainHeader title={"users"}>
                <Modal>
                    <Modal.Open opens="user-form">
                        <div>
                            <AddButton label={"new sign up"} />
                        </div>
                    </Modal.Open>
                    <Modal.Window name="user-form">
                        <UserForm />
                    </Modal.Window>
                </Modal>
            </MainHeader>
            <SelectUser />
            {isGetting ? (
                <Loader />
            ) : (
                <>
                    <UserTable users={users} />
                    <Pagination count={count} pageSize={TABLE_PAGE_SIZE} />
                </>
            )}
        </Main>
    );
}

export default Users;
