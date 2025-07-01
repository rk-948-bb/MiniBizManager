import { Schema, model, Document } from "mongoose";

export interface CategoryDocument extends Document {
    name: string;
    description?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

const CategorySchema = new Schema<CategoryDocument>(
    {
        name: { 
            type: String, 
            required: true, 
            unique: true,
            actions: { insert: true, update: true, delete: false }
        },
        description: { 
            type: String,
            actions: { insert: true, update: true, delete: true }
        }
    },
    { timestamps: true }
);

export const CategoryModel = model<CategoryDocument>("Category", CategorySchema);