import supabase from "./supabase";

export async function getMessages({ source, read, page, pageSize, email }) {
    let query = supabase
        .from("message")
        .select("*", {
            count: "exact",
        })
        .neq("email", email)
        .or(`destination.eq.ALL,destination.eq.${email}`)
        .order("created_at", { ascending: false });
    if (source !== "") {
        query = query.eq("source", source);
    }
    if (read !== "") {
        query = query.eq("read", read === "true");
    }
    if (page) {
        const from = (page - 1) * pageSize;
        const to = from + pageSize - 1;
        query = query.range(from, to);
    }

    let { data, error, count } = await query;
    if (error) {
        console.error(error);
        throw new Error("Messages could not be loaded");
    }
    return { data, count };
}

export async function addMessage(msgData) {
    const { data, error } = await supabase
        .from("message")
        .insert([msgData])
        .select()
        .single();
    if (error) {
        console.log(error.message);
        throw new Error(error.message);
    }
    return data;
}
