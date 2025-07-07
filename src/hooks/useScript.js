import { useState, useEffect } from 'react';

/**
 * Custom hook to dynamically load an external script.
 * @param {string} src The source URL of the script to load.
 * @returns {boolean} A boolean indicating if the script has loaded.
 */
export const useScript = (src) => {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        // If the script is already on the page (e.g. from a previous render), don't add it again.
        if (window.THREE) {
            setIsLoaded(true);
            return;
        }

        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        script.onload = () => setIsLoaded(true);
        
        document.body.appendChild(script);

        // Cleanup function to remove the script when the component unmounts.
        return () => {
            if (document.body.contains(script)) {
                document.body.removeChild(script);
            }
        };
    }, [src]);

    return isLoaded;
};
