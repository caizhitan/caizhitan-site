import { useState, useEffect } from 'react';

export const useAssetLoader = (imageSrcs = []) => {
    const [assetsLoaded, setAssetsLoaded] = useState(false);

    useEffect(() => {
        const loadImages = async () => {
            if (imageSrcs.length === 0) {
                setAssetsLoaded(true);
                return;
            }

            const promises = imageSrcs.map((src) => {
                return new Promise((resolve) => {
                    const img = new Image();
                    img.src = src;
                    img.onload = resolve;
                    img.onerror = resolve; // Continue on error
                });
            });

            await Promise.all(promises);
            setAssetsLoaded(true);
        };

        loadImages();
    }, [imageSrcs]);

    return { assetsLoaded };
};
