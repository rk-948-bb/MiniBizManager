import { Schema, model, Document, Types } from "mongoose";
import { CustomerDocument } from "./customer";

export interface IncomeModel extends Document {
    InvoiceNumber: number;
    CustomerId: Types.ObjectId | CustomerDocument;
    InvoiceDate: Date;
    PrintDate: Date;
    Amount: number;
    VAT?: number;
    Description?: string;
    payments?: Types.ObjectId[]; // קישור לתשלומים
}

const IncomeSchema = new Schema<IncomeModel>({
    InvoiceNumber: { 
        type: Number, 
        required: true, 
        unique: true,
        actions: { insert: true, update: false, delete: false }
    },
    CustomerId: { 
        type: Types.ObjectId, 
        ref: "Customer", 
        required: true,
        actions: { insert: true, update: true, delete: false }
    },
    InvoiceDate: { 
        type: Date, 
        default: Date.now,
        actions: { insert: true, update: true, delete: false }
    },
    PrintDate: {
        type: Date,
        default: Date.now,
        required: true,
        validate: {
            validator: function (this: IncomeModel, pDate: Date) {
                return pDate > this.InvoiceDate;
            },
            message: (props: any) => `PrintDate (${props.value}) must be after InvoiceDate`
        },
        actions: { insert: true, update: true, delete: false }
    },
    Amount: { 
        type: Number, 
        required: true, 
        min: 0,
        actions: { insert: true, update: true, delete: false }
    },
    VAT: { 
        type: Number, 
        min: 0,
        actions: { insert: true, update: true, delete: false }
    },
    Description: { 
        type: String, 
        maxlength: 500,
        actions: { insert: true, update: true, delete: true }
    },
    payments: [{ 
        type: Types.ObjectId, 
        ref: "IncomePayments",
        actions: { insert: false, update: true, delete: false }
    }] // קישור לתשלומים
});

export const Income = model<IncomeModel>("Income", IncomeSchema);
