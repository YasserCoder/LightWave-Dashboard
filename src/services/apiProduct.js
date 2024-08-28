import { getToday } from "../utils/helpers";
import supabase from "./supabase";

export async function getMostSoldProduct(date) {
    const { data, error } = await supabase
        .from("orderItems")
        .select(
            "created_at, productId,quantity,product(name,imgs:prodImage(imgUrl,imgAlt))"
        )
        .gte("created_at", date)
        .lte("created_at", getToday({ end: true }));

    if (error) {
        console.error(error);
        throw new Error("Orders could not get loaded");
    }

    const aggregatedData = data.reduce((acc, item) => {
        if (acc[item.productId]) {
            acc[item.productId].quantity += item.quantity;
        } else {
            acc[item.productId] = {
                name: item.product.name,
                quantity: item.quantity,
                imgUrl: item.product.imgs.at(0).imgUrl,
                imgAlt: item.product.imgs.at(0).imgAlt,
            };
        }
        return acc;
    }, {});

    // Convert aggregated data to an array of objects
    const result = Object.entries(aggregatedData).map(
        ([id, { name, quantity, imgUrl, imgAlt }]) => ({
            id,
            name,
            quantity,
            imgUrl,
            imgAlt,
        })
    );

    // Sort by quantity in descending order
    result.sort((a, b) => b.quantity - a.quantity);

    return result.slice(0, 6);
}
