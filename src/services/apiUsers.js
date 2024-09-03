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
