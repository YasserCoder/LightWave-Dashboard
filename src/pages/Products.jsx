import { useSearchParams } from "react-router-dom";

import { useCategories } from "../hook/category/useCategories";
import { useGetProducts } from "../hook/product/useGetProducts";
import { PAGE_SIZE } from "../utils/constants";

import Categories from "../features/products/Categories";
import DisplayProducts from "../features/products/DisplayProducts";
import Loader from "../ui/Loader";
import Pagination from "../features/products/Pagination";

import { FaBoxOpen, FaPlus } from "react-icons/fa6";
import { MdSearchOff } from "react-icons/md";
import Modal from "../ui/Modal";

function Products() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("q");

    const { isLoading, cats } = useCategories();
    const {
        isLoading: isLoading2,
        products,
        count,
    } = useGetProducts(PAGE_SIZE);

    return (
        <div className="container py-7 flex flex-col gap-y-[30px] overflow-x-hidden">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl xs:text-4xl md:text-5xl font-extrabold capitalize">
                    Products
                </h1>
                {/* <Link
                    to={"/products/create"}
                    className="py-1.5 xs:py-2 px-2.5 xs:px-4 flex items-center gap-x-1 xs:gap-x-2 rounded-full text-gray-950 bg-yellow-200 shadow-lg"
                >
                    <FaPlus className="text-sm xs:text-base" />
                    <span className="capitalize text-sm xs:text-base font-semibold">
                        add new product
                    </span>
                </Link> */}
                <div>
                    <Modal>
                        <Modal.Open opens="product-form">
                            <button className="py-1.5 xs:py-2 px-2.5 xs:px-4 flex items-center gap-x-1 xs:gap-x-2 rounded-full text-gray-950 bg-yellow-200 shadow-lg">
                                <FaPlus className="text-sm xs:text-base" />
                                <span className="capitalize text-sm xs:text-base font-semibold">
                                    add new product
                                </span>
                            </button>
                        </Modal.Open>
                        <Modal.Window name="product-form">
                            <form className="w-[80%] h-[400px]"></form>
                        </Modal.Window>
                    </Modal>
                </div>
            </div>
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
                            <Pagination count={count} />
                        </>
                    )}
                </>
            )}
        </div>
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
