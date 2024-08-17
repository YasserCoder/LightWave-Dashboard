/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        container: {
            center: true,
            padding: "15px",
        },
        extend: {
            fontFamily: {
                body: ["Nunito Sans"],
            },
            colors: {
                main: "var(--color-main)",
                content: "var(--color-secondary)",
                bkg: {
                    main: "var(--color-bkg)",
                    secondary: "var(--color-secondary-bkg)",
                },
                table: "var(--color-table)",
                input: "var(--color-input)",
                colored: "#4880ff",
            },
            screens: {
                xs: "400px",
            },
        },
    },
    darkMode: ["class", '[data-theme="dark"]'],
};
