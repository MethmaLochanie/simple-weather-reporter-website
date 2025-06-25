import mongoose, { Schema, Types, Document } from 'mongoose';

export interface ISearchEntry {
  city: string;
  country: string;
  lat: number;
  lng: number;
  searchedAt: Date;
}

export interface ISearchHistory extends Document {
  userId: Types.ObjectId;
  searches: ISearchEntry[];
}

const searchEntrySchema = new Schema<ISearchEntry>({
  city: { type: String, required: true },
  country: { type: String, required: true },
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
  searchedAt: { type: Date, default: Date.now }
});

const searchHistorySchema = new Schema<ISearchHistory>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  searches: { type: [searchEntrySchema], default: [] }
});

export const SearchHistory = mongoose.model<ISearchHistory>('SearchHistory', searchHistorySchema); 