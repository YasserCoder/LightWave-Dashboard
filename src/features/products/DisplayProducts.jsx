import ProdCard from "../../ui/ProdCard";

function DisplayProducts({ products }) {
    return (
        <div className="grid grid-cols-200 gap-3 px-1 xs:px-2 pb-5 lg:pb-7">
            {products?.map((prod) => {
                return <ProdCard key={prod.id} id={prod.id} />;
            })}
        </div>
    );
}

export default DisplayProducts;
