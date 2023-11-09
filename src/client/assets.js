const assetNames = ["ship.svg", "bullet.svg"];

const assets = {};
const downloadPromise = Promise.all(assetNames.map(downloadAsset));

function downloadAsset(assetName) {
  return new Promise(resolve => {
    const asset = new Image();
    asset.addEventListener("load", () => {
      console.log(`Downloaded ${assetName}`);
      assets[assetName] = asset;
      resolve();
    });
    asset.src = `/assets/${assetName}`;
  });
}

export const downloadAssets = () => downloadPromise;
export const getAsset = assetName => assets[assetName];