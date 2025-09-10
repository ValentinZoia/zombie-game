export interface GameMessage {
  id: string;
  role: "user " | "assistant";
  content: string;
  image?: string;
  imageLoading?: string;
}

export interface GeneratedIamge {
  base64Data: string;
  mediaType: string;
  uint8ArrayData?: Uint8Array;
}
