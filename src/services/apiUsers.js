import supabase from "./supabase";

import { getToday } from "../utils/helpers";

export async function getTotalUsers() {
    const { count, error } = await supabase
        .from("profile")
        .select("authority", { count: "exact" })
        .eq("authority", "user");

    if (error) {
        console.error("Error fetching users:", error.message);
    }

    return count;
}
export async function getUsersAfterDate(date, lessDate) {
    const { count, error } = await supabase
        .from("profile")
        .select("authority", { count: "exact" })
        .eq("authority", "user")
        .gte("created_at", date)
        .lte("created_at", lessDate ? lessDate : getToday({ end: true }));

    if (error) {
        console.error("Error fetching users:", error.message);
    }

    return count;
}

export async function getUsers({ role, sortBy, email, page, pageSize }) {
    let query = supabase
        .from("profile")
        .select("*", {
            count: "exact",
        })
        .neq("email", email);

    if (sortBy !== "") {
        const [column, order] = sortBy.split("-");
        query = query.order(column, { ascending: order === "asc" });
    }

    if (role !== "") {
        query = query.eq("authority", role);
    }
    if (page) {
        const from = (page - 1) * pageSize;
        const to = from + pageSize - 1;
        query = query.range(from, to);
    }

    let { data, error, count } = await query;
    if (error) {
        console.error(error);
        throw new Error("Users could not be loaded");
    }

    return { data, count };
}
export async function editUserRole({ id, role }) {
    const { error } = await supabase
        .from("profile")
        .update({ authority: role })
        .eq("id", id);
    if (error) {
        console.log(error.message);
        throw new Error(error.message);
    }
    return id;
}
export async function getUserInfo(usrId) {
    let { data, error } = await supabase
        .from("profile")
        .select("*")
        .eq("id", usrId)
        .single();
    if (error) {
        console.error(error.message);
        throw new Error("User could not be loaded");
    }

    return data;
}
