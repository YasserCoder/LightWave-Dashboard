import supabase from "./supabase";

export async function signup({ email, password, name, phone, authority }) {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                name,
                authority,
                phone,
                email,
            },
        },
    });

    if (error) throw new Error(error.message);

    return data;
}
