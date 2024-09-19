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

export async function getOrders({ status, sortBy, page, pageSize }) {
    let query = supabase.from("order").select("*", {
        count: "exact",
    });

    if (status !== "") {
        query = query.eq("status", status);
    }
    if (sortBy !== "") {
        const [column, order] = sortBy.split("-");
        query = query.order(column, { ascending: order === "asc" });
    }
    if (page) {
        const from = (page - 1) * pageSize;
        const to = from + pageSize - 1;
        query = query.range(from, to);
    }

    let { data, error, count } = await query;
    if (error) {
        console.error(error);
        throw new Error("Orders could not be loaded");
    }

    return { data, count };
}
export async function deleteOrder(id) {
    const { error } = await supabase.from("order").delete().eq("id", id);
    if (error) {
        console.error(error.message);
        throw new Error(error.message);
    }
}
export async function editOrder({ id, status }) {
    const { error } = await supabase
        .from("order")
        .update({ status: status })
        .eq("id", id);
    if (error) {
        console.log(error.message);
        throw new Error(error.message);
    }
}
