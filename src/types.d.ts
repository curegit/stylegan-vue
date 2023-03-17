export declare global {
  type WorkSpace = {
    state: WorkspaceState;
    update: (state: WorkspaceState) => void;
  };

  type WorkspaceState = {
    model_id: string;
    data: ImageData[];
  };

  type ImageData = {
    data: string;
    mime: string;
    width: number;
    height: number;
  };

  type SimpleImage = ImageData & {
    latent: string;
  };
}
