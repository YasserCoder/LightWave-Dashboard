import Categories from "../features/products/Categories";
import { useCategories } from "../hook/category/useCategories";
import Loader from "../ui/Loader";

function Products() {
    const { isLoading, cats } = useCategories();
    return (
        <div className="container py-7 flex flex-col gap-y-[30px] overflow-x-hidden">
            <h1 className="text-2xl xs:text-4xl md:text-5xl font-extrabold capitalize">
                Products
            </h1>
            {isLoading ? <Loader /> : <Categories cats={cats} />}
        </div>
    );
}

export default Products;
