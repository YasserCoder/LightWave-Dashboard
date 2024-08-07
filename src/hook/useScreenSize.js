import { useState, useEffect } from "react";

export function useScreenSize(width) {
    const [screenSize, setScreenSize] = useState(window.innerWidth < width);

    useEffect(
        function () {
            function handleResize() {
                setScreenSize(window.innerWidth < width);
            }
            window.addEventListener("resize", handleResize);
            return () => {
                window.removeEventListener("resize", handleResize);
            };
        },
        [width, screenSize]
    );

    return { screenSize, setScreenSize };
}
