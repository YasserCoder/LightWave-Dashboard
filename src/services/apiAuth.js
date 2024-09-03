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

export async function login({ email, password }) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) throw new Error(error.message);

    const { data: profile, error: profileError } = await supabase
        .from("profile")
        .select("authority")
        .eq("id", data?.user?.id)
        .single();
    if (profileError) throw new Error(profileError.message);

    if (profile?.authority === "admin") return data;
    return null;
}

export async function getCurrentUser() {
    const { data: session } = await supabase.auth.getSession();
    if (!session.session) return null;

    const { data, error } = await supabase.auth.getUser();

    if (error) throw new Error(error.message);
    return data?.user;
}

export async function logout() {
    const { error } = await supabase.auth.signOut();
    if (error) throw new Error(error.message);
}
