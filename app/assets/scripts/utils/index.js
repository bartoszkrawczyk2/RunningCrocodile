export const loadAssets = (assets = {}, callback = () => {}) => {
    let loadedAssets = {}, assetCount = 0, loadedAssetsCount = 0;

    for (let key in assets) {
        assetCount += assets[key].length;
    }

    for (let key in assets) {
        loadedAssets[key] = [];

        for (let i = 0; i < assets[key].length; i++) {
            let img = new Image();

            img.onload = () => {
                loadedAssets[key][i] = img;
                loadedAssetsCount++;

                if (loadedAssetsCount === assetCount) callback.call(null, loadedAssets);
            }

            img.src = assets[key][i];
        }
    }
}