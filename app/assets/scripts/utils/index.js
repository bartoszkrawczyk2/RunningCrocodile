let loadImage = url => new Promise((resolve, reject) => {
    let img = new Image();
    img.onload = resolve(img);
    img.onerror = reject(img);
    img.src = url;
});

export async function loadAssets(assets = {}) {
    let loadedAssets = {};

    try {
        for (let key in assets) {
            loadedAssets[key] = [];

            for (let asset of assets[key]) {
                loadedAssets[key] = [...loadedAssets[key], await loadImage(asset)];
            }
        }

        return loadedAssets;
    } catch(e) {
        return new Error('Failed to load assets');
    };
};