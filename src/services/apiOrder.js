import { getToday } from "../utils/helpers";
import supabase from "./supabase";

export async function getOrdersAfterDate(date, lessDate) {
    const { data, error } = await supabase
        .from("order")
        .select("created_at, status,totalAmount")
        .gte("created_at", date)
        .lte("created_at", lessDate ? lessDate : getToday({ end: true }));

    if (error) {
        console.error(error);
        throw new Error("Orders could not get loaded");
    }

    return data;
}
