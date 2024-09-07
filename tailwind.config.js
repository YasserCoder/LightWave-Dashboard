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
            gridTemplateColumns: {
                220: "repeat(auto-fill, minmax(220px, 1fr));",
                200: "repeat(auto-fill, minmax(200px, 1fr));",
            },
        },
    },
    darkMode: ["class", '[data-theme="dark"]'],
};
