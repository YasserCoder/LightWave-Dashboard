import supabase, { supabaseUrl } from "./supabase";

export async function getDeals() {
    let { data, error } = await supabase.from("deal").select("id");
    if (error) {
        console.log(error.message);
        throw new Error(error.message);
    }

    return data;
}

export async function getDeal(id) {
    let { data, error } = await supabase
        .from("deal")
        .select("* ")
        .eq("id", id)
        .single();
    if (error) {
        console.log(error.message);
        throw new Error(error.message);
    }

    return data;
}

export async function addDeal({ dealData, dealItems }) {
    const imgName = `${Math.random()}-${dealData.img.name}`.replaceAll("/", "");
    let imgUrl = `${supabaseUrl}/storage/v1/object/public/dealImgs/${imgName}`;

    const { error: storageError } = await supabase.storage
        .from("dealImgs")
        .upload(imgName, dealData.img);

    if (storageError) {
        console.error(storageError);
        throw new Error("Deal Img could not be uploaded");
    }

    const { data: deal, error: dealError } = await supabase
        .from("deal")
        .insert({
            img: imgUrl,
            amount: dealData.amount,
            deliveryCost: dealData.deliveryCost,
        })
        .select()
        .single();

    if (dealError) {
        console.log(dealError.message);
        throw new Error(dealError.message);
    }

    const dealItemsData = dealItems.map((item) => ({
        dealId: deal.id,
        productId: item?.id,
        quantity: item?.qte,
    }));

    const { error: dealItemsError } = await supabase
        .from("dealItems")
        .insert(dealItemsData);

    if (dealItemsError) {
        console.log(dealItemsError.message);
        throw new Error(dealItemsError.message);
    }
}
