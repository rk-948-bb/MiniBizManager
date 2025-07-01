import { Schema, model, Types, Document } from "mongoose";

export interface UserDocument extends Document {
    name: string;
    email: string;
    password: string;
    businessType?: string;
    companyID?: number;//מס חפ או עמ
}
const UserSchema = new Schema<UserDocument>({
    name:
    {
        type: String,
        required: true,
        actions: { insert: true, update: true, delete: false }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        actions: { insert: true, update: true, delete: false }
    },
    password: {
        type: String,
        required: true,
        actions: { insert: true, update: true, delete: false }
    },
    businessType: {
        type: String,
        default: "private",
        actions: { insert: true, update: true, delete: false }
    }, // private or business
    companyID:
    {
        type: Number,
        default: 0,
        actions: { insert: true, update: true, delete: false }
    }, //מס חפ או עמ
});
const UserModel = model<UserDocument>("User", UserSchema);