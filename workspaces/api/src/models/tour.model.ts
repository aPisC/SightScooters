import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from "sequelize-typescript";
import { Optional } from "sequelize/types";
import { ILandmark, ITour } from "common";
import LandmarkModel from "./landmark.model";
import TourLandmarkModel from "./tourLandmark.model";

@Table({
  createdAt: false,
  updatedAt: false,
})
export default class TourModel
  extends Model
  implements Omit<Optional<ITour, "id">, "landmarks">
{
  @Column declare time: number;

  @Column declare name: string;

  @Column declare description: string;

  @Column declare rating: number;

  @Column declare ratingCount: number;

  @Column({
    defaultValue: "",
    type: DataType.STRING,
    get: function () {
      return (this.getDataValue("tags") as string).split(";");
    },
    set: function (val) {
      this.setDataValue("tags", (val as string[]).join(";"));
    },
  })
  declare tags: string[];

  @BelongsToMany(() => LandmarkModel, () => TourLandmarkModel)
  declare landmarks: LandmarkModel[];

  static async addLandmark(tourId: number, landmarkId: number): Promise<void> {
    const tour  = await TourModel.findByPk(tourId) as TourModel;
    const landmark = await LandmarkModel.findByPk(landmarkId) as LandmarkModel;

    const tags =[...new Set( [...tour?.tags, ...landmark?.tags])]

    tour.tags = tags;

    await TourLandmarkModel.create({
      tourId,
      landmarkId,
    });

    await tour.save();
  }
}
