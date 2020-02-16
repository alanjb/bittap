import { Document, Schema, Model, model} from "mongoose"
import { IVenue } from "../interfaces/venue"

export interface IVenueModel extends IVenue, Document {

}

export var VenueSchema: Schema = new Schema({
  currentTime: String,
  shortName: String,
  address: String,
  backgroundImage: String,
  logoImage: String,
}, {
  timestamps: true
})

export const Venue: Model<IVenueModel> = model<IVenueModel>("Venue", VenueSchema);