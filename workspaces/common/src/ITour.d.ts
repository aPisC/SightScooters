import { ILandmark } from "./ILandmark";

export interface ITour {
  id: string;
  time: number;
  landmarks: Array<ILandmark>;
  id: string;
  name: string;
  description: string;
  rating: number;
  ratingCount: number;
}
