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
export async function getMessageInfo(msgId) {
    let { data, error } = await supabase
        .from("message")
        .select("*")
        .eq("id", msgId)
        .single();
    if (error) {
        console.error(error.message);
        throw new Error("Message could not be loaded");
    }

    return data;
}
export async function editMessage(id) {
    const { error } = await supabase
        .from("message")
        .update({ read: true })
        .eq("id", id);
    if (error) {
        console.log(error.message);
        throw new Error(error.message);
    }
    return id;
}
export async function deleteMessage(id) {
    const { error } = await supabase.from("message").delete().eq("id", id);
    if (error) {
        console.error(error.message);
        throw new Error(error.message);
    }
}
export async function getUnreadMessages(email) {
    let { error, count } = await supabase
        .from("message")
        .select("id", {
            count: "exact",
        })
        .eq("read", false)
        .neq("email", email)
        .or(`destination.eq.ALL,destination.eq.${email}`);
    if (error) {
        console.error(error);
        throw new Error("Messages could not be loaded");
    }

    return count;
}
