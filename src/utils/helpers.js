export const getToday = function (options = {}) {
    const today = new Date();

    // This is necessary to compare with created_at from Supabase, because it it not at 0.0.0.0, so we need to set the date to be END of the day when we compare it with earlier dates
    if (options?.end)
        // Set to the last second of the day
        today.setUTCHours(23, 59, 59, 999);
    else today.setUTCHours(0, 0, 0, 0);
    return today.toISOString();
};

export const formatCurrency = (value) =>
    new Intl.NumberFormat("en", { style: "currency", currency: "USD" }).format(
        value
    );

export function calculatePercentageChange(oldValue, newValue) {
    if (oldValue === 0 && newValue === 0) return 0;
    if (oldValue === 0) return 100;
    const difference = newValue - oldValue;
    const percentageChange = (difference / oldValue) * 100;
    return percentageChange;
}

export function calculateNewPrice(price, sale) {
    if (sale === 0) return price.toFixed(2);
    let saleAmount = (price * sale) / 100;
    return (price - saleAmount).toFixed(2);
}

export const isWhitespace = (str) => /^\s*$/.test(str);
