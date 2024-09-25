import { useSearchParams } from "react-router-dom";

import { useCategories } from "../hook/category/useCategories";
import { useGetProducts } from "../hook/product/useGetProducts";
import { PRODUCT_PAGE_SIZE } from "../utils/constants";

import Categories from "../features/products/Categories";
import DisplayProducts from "../features/products/DisplayProducts";
import Loader from "../ui/Loader";
import Modal from "../ui/Modal";
import AddNewProduct from "../features/products/AddNewProduct";
import Pagination from "../ui/Pagination";
import Main from "../ui/Main";
import MainHeader from "../ui/MainHeader";
import AddButton from "../ui/AddButton";

import { FaBoxOpen } from "react-icons/fa6";
import { MdSearchOff } from "react-icons/md";

function Products() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("q");

    const { isLoading, cats } = useCategories();
    const {
        isLoading: isLoading2,
        products,
        count,
    } = useGetProducts(PRODUCT_PAGE_SIZE);

    return (
        <Main>
            <MainHeader title={"products"}>
                <Modal>
                    <Modal.Open opens="product-form">
                        <div>
                            <AddButton label={"add new product"} />
                        </div>
                    </Modal.Open>
                    <Modal.Window name="product-form">
                        <AddNewProduct />
                    </Modal.Window>
                </Modal>
            </MainHeader>
            {isLoading ? (
                <Loader />
            ) : (
                <>
                    <Categories cats={cats} />
                    {isLoading2 ? (
                        <Loader />
                    ) : count === 0 ? (
                        query ? (
                            <ItemNotFound />
                        ) : (
                            <EmptyCategory />
                        )
                    ) : (
                        <>
                            <DisplayProducts products={products} />
                            <Pagination
                                count={count}
                                pageSize={PRODUCT_PAGE_SIZE}
                            />
                        </>
                    )}
                </>
            )}
        </Main>
    );
}

function ItemNotFound({ query }) {
    return (
        <div className="w-full flex flex-col justify-center items-center gap-y-5 mt-8">
            <MdSearchOff className="size-[160px] text-colored opacity-60 " />
            <h3 className="text-3xl capitalize font-bold pt-5">
                product not found
            </h3>
            <p className="max-w-[170px] text-center">
                {`there is no product named ${query}`}
            </p>
        </div>
    );
}
function EmptyCategory() {
    return (
        <div className="w-full flex flex-col justify-center items-center gap-y-5 mt-8">
            <FaBoxOpen className="size-[160px] text-colored opacity-60 " />
            <h3 className="text-3xl capitalize font-bold pt-5">
                Empty Category
            </h3>
        </div>
    );
}

export default Products;
