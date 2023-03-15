export declare global {
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
}
