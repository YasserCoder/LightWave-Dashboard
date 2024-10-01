import { useGetDeals } from "../hook/deal/useGetDeals";

import AddButton from "../ui/AddButton";
import Main from "../ui/Main";
import MainHeader from "../ui/MainHeader";
import Loader from "../ui/Loader";
import Modal from "../ui/Modal";
import DisplayDeals from "../features/deals/DisplayDeals";
import DealForm from "../features/deals/DealForm";

function Deals() {
    const { isGetting, deals } = useGetDeals();
    return (
        <Main>
            <MainHeader title={"deals"}>
                <Modal>
                    <Modal.Open opens="deal-form">
                        <div>
                            <AddButton label={"add new deal"} />
                        </div>
                    </Modal.Open>
                    <Modal.Window name="deal-form">
                        <DealForm />
                    </Modal.Window>
                </Modal>
            </MainHeader>
            {isGetting ? <Loader /> : <DisplayDeals deals={deals} />}
        </Main>
    );
}

export default Deals;
