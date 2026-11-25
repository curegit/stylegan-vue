export declare global {
  type WorkspaceState = {
    modelId: string;
    data: {
      generated: {
        default: {
          groupName?: string;
          images: {
            [key: string]: SimpleImage;
          };
        };
        [key: string]: {
          groupName?: string;
          images: {
            [key: string]: SimpleImage;
          };
        };
      };
    };
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
}
