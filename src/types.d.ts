export declare global {
  type WorkspaceState = {
    model_id: string;
    data: { gen: ImageData[] };
  };

  type ImageData = {
    data: string;
    mime_type: string;
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
  }
}
