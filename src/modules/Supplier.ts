import { Schema, model, Document } from "mongoose";

export interface SupplierDocument extends Document {
    name: string;
    email?: string;
    phone?: string;
    address?: string;
    companyNum?: number;
}

const SupplierSchema = new Schema<SupplierDocument>({
    name: { 
        type: String, 
        required: true,
        actions: { insert: true, update: true, delete: false }
    },
    email: { 
        type: String,
        actions: { insert: true, update: true, delete: true }
    },
    phone: { 
        type: String,
        actions: { insert: true, update: true, delete: true}
    },
    address: { 
        type: String,
        actions: { insert: true, update: true, delete: true }
    },
    companyNum: { 
        type: Number,
        actions: { insert: true, update: false, delete: false }
    }
});

export const SupplierModel = model<SupplierDocument>("Supplier", SupplierSchema);