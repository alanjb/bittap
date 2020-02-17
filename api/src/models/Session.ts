import { Document, Schema, Model, model} from "mongoose"
import { ISession } from "../interfaces/session"

export interface ISessionModel extends ISession, Document {

}

export var SessionSchema: Schema = new Schema({
  startTime: StartTime,
  endTime: EndTime, 
  id: String,
  
  expiration: Date,
  valid: Boolean,
}, {
  timestamps: true
})

export const Session: Model<ISessionModel> = model<ISessionModel>("Transaction", SessionSchema);