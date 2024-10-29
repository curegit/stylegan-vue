export declare global {
  type WorkspaceState = {
    modelId: string;
    data: { gen: ImageData[] };
  };

  type ImageData = {
    data: string;
    mimeType: string;
    width: number;
    height: number;
  };

  type SimpleImage = ImageData & {
    latent: string;
  };

  interface Model {
    id: string;
    name: string;
    description: string;
    width: number;
    height: number;
    mimeType: string;
    example: string;
  }
}
