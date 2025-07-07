import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook to detect when an element enters the viewport.
 * @param {object} options The options for the IntersectionObserver.
 * @returns {[React.RefObject, boolean]} A ref to attach to the element and a boolean indicating visibility.
 */
export const useIntersectionObserver = (options) => {
    const containerRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                // When the element is intersecting the viewport
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    // Stop observing the element once it's visible to prevent re-triggering.
                    observer.unobserve(entry.target);
                }
            },
            options
        );

        const currentRef = containerRef.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        // Cleanup the observer when the component unmounts.
        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [containerRef, options]);

    return [containerRef, isVisible];
};
