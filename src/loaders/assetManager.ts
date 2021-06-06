import { Service } from "typedi";
@Service()
export default class AssetManager {
  loadedAssets: any = [];

  constructor() {}

  async loadAssets(assets:{}) {
    const assetPromises: any = [];

    for (const [assetName, assetUrl] of Object.entries(assets)) {
      const assetPromise = this.loadSingleAsset(assetUrl, assetName);
      assetPromises.push(assetPromise);
    }

    await Promise.all(assetPromises);
  }

  loadSingleAsset(assetUrl: any, assetName: string) {
    return new Promise<void>((resolve) => {
      const assetImage = new Image();
      assetImage.onload = () => {
        assetImage.width /= 2;
        assetImage.height /= 2;

        this.loadedAssets[assetName] = assetImage;
        resolve();
      };
      assetImage.src = assetUrl;
    });
  }

  getAsset(assetName: string) {
    return this.loadedAssets[assetName];
  }
}
