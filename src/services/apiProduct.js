import { getToday } from "../utils/helpers";
import supabase from "./supabase";

export async function getMostSoldProduct(date) {
    const { data, error } = await supabase
        .from("orderItems")
        .select("created_at, productId,quantity")
        .gte("created_at", date)
        .lte("created_at", getToday({ end: true }));

    if (error) {
        console.error(error);
        throw new Error("Orders could not get loaded");
    }

    // Aggregate quantities by productId
    const aggregatedData = data.reduce((acc, item) => {
        if (acc[item.productId]) {
            acc[item.productId] += item.quantity;
        } else {
            acc[item.productId] = item.quantity;
        }
        return acc;
    }, {});

    // Convert aggregated data to an array of objects
    const result = Object.entries(aggregatedData).map(
        ([productId, quantity]) => ({
            productId,
            quantity,
        })
    );

    //Sort by quantity in descending order
    result.sort((a, b) => b.quantity - a.quantity);

    return result;
}
