import supabase from "./supabase";

export async function getMessages({ source, read, page, pageSize, email }) {
    let query = supabase
        .from("message")
        .select("*", {
            count: "exact",
        })
        .or(`destination.eq.ALL,destination.eq.${email}`);
    if (source !== "") {
        query = query.eq("source", source);
    }
    if (read !== "") {
        query = query.eq("read", Boolean(read));
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
    // console.log(email);
    return { data, count };
}
