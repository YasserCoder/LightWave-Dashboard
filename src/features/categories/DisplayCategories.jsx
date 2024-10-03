import Swal from "sweetalert2";
import { useDeleteCategory } from "../../hook/category/useDeleteCategory";
import { HiXMark } from "react-icons/hi2";

function DisplayCategories({ cats }) {
    return (
        <div className="mt-8 flex justify-between gap-y-8 flex-wrap">
            {Object.keys(cats).map((parentCategory) => (
                <div
                    key={parentCategory}
                    className=" border border-content px-2 xxs:px-4 rounded-lg py-3 basis-[100%] sm:basis-[48%] lg:basis-[32%] xl:basis-[31%]"
                >
                    <h2 className="text-xl sm:text-2xl font-semibold sm:font-bold text-colored mb-4 text-center">
                        {parentCategory}
                    </h2>
                    <CategoryNode
                        name={parentCategory}
                        category={cats[parentCategory]}
                    />
                </div>
            ))}
        </div>
    );
}

const CategoryNode = ({ category, name }) => {
    const { isDeleting, deleteCategory } = useDeleteCategory();
    function handleDelete(name) {
        Swal.fire({
            title: "Are you sure?",
            text: "Delete Category and all its sub-categories!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
            customClass: {
                popup: "dark:bg-gray-800 dark:text-white",
            },
        }).then((result) => {
            if (result.isConfirmed) {
                deleteCategory(name);
            }
        });
    }

    return (
        <ul className="ml-2 xxs:ml-4 list-disc">
            <li className="">
                <span>{name}</span>
                <button
                    className="text-red-500 ml-2 align-middle text-lg hover:scale-125 duration-300"
                    disabled={isDeleting}
                    onClick={() => handleDelete(name)}
                >
                    <HiXMark />
                </button>
            </li>

            {category &&
                typeof category === "object" &&
                Object.keys(category).length > 0 && (
                    <ul className="ml-3 list-none">
                        {Object.keys(category).map((subCategory) => (
                            <CategoryNode
                                key={subCategory}
                                name={subCategory}
                                category={category[subCategory]}
                            />
                        ))}
                    </ul>
                )}
        </ul>
    );
};
export default DisplayCategories;
