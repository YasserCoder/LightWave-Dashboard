import { useCategories } from "../hook/category/useCategories";

import CategoryForm from "../features/categories/CategoryForm";
import AddButton from "../ui/AddButton";
import Loader from "../ui/Loader";
import Main from "../ui/Main";
import MainHeader from "../ui/MainHeader";
import Modal from "../ui/Modal";

function Categories() {
    const { isLoading, cats } = useCategories();
    return (
        <Main>
            <MainHeader title={"categories"}>
                <Modal>
                    <Modal.Open opens="category-form">
                        <div>
                            <AddButton label={"new category"} />
                        </div>
                    </Modal.Open>
                    <Modal.Window name="category-form">
                        <CategoryForm />
                    </Modal.Window>
                </Modal>
            </MainHeader>
            {isLoading ? <Loader /> : <div className=""></div>}
        </Main>
    );
}

export default Categories;
