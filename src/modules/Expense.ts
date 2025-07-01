import { Schema, model, Document, Types } from "mongoose";

export interface ExpenseModel extends Document {
    ReferenceNumber: number;
    Date: Date;
    SupplierId: Types.ObjectId; // קישור לספק
    CategoryId: Types.ObjectId;
    Amount: number;
    VAT?: number;
    PaymentType: "Cash" | "CreditCard" | "Cheque" | "BankTransfer";
    Description?: string;
    FileUrl?: string; // קישור לקובץ אסמכתא
}

const ExpenseSchema = new Schema<ExpenseModel>({
    ReferenceNumber: {
        type: Number,
        required: true,
        unique: true,
        actions: { insert: true, update: false, delete: false }
    },
    Date: {
        type: Date,
        default: Date.now,
        actions: { insert: true, update: true, delete: false }
    },
    SupplierId: {
        type: Schema.Types.ObjectId,
        ref: "Supplier",
        required: true,
        actions: { insert: true, update: true, delete: false }
    },
    CategoryId: {
        type: Schema.Types.ObjectId, 
        ref: "Category",
        required: true,
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
    PaymentType: {
        type: String,
        enum: ["Cash", "CreditCard", "Cheque", "BankTransfer"],
        required: true,
        actions: { insert: true, update: true, delete: false }
    },
    Description: {
        type: String,
        maxlength: 500,
        actions: { insert: true, update: true, delete: true }
    },
    FileUrl: {
        type: String,
        // URL לקובץ אסמכתא
        actions: { insert: true, update: true, delete: true }

    }

});

export const Expense = model<ExpenseModel>("Expense", ExpenseSchema);