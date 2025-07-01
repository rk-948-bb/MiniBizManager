import { model, Schema, Types, Document } from "mongoose";

export interface IncomePaymentsModel extends Document {
    InvoiceNum: Types.ObjectId;
    paymentType?: string;
    sum: number;
    Date?: Date;
    cardLastFourDigits?: number;
    paymentsNum?: number;
    chequeNumber?: number;
    cheqeBankName?: string;
    transferNumber?: number;
    transferBankName?: string;
}

const IncomePaymentsSchema = new Schema({
    InvoiceNum: {
        type: Schema.Types.ObjectId,
        ref: "Income",
        required: true,
        actions: { insert: true, update: false, delete: false }
    },
    paymentType: {
        type: String,
        enum: ["Cash", "BankTransfer", "Cheque", "CreditCard"],
        required: true,
        actions: { insert: true, update: true, delete: false }
    },
    sum: {
        type: Number,
        required: true,
        actions: { insert: true, update: true, delete: false }
    },
    Date: {
        type: Date,
        actions: { insert: true, update: true, delete: false }
    },
    cardLastFourDigits: {
        type: Number,
        match: [/^\d{4}$/, 'Card last four digits must be a 4-digit number'],
        actions: { insert: true, update: true, delete: true }
    },
    paymentsNum: {
        type: Number,
        actions: { insert: true, update: true, delete: true }
    },
    chequeNumber: {
        type: Number,
        match: [/^\d+$/, 'Cheque number must be a valid number'],
        actions: { insert: true, update: true, delete: true }
    },
    cheqeBankName: {
        type: String,
        actions: { insert: true, update: true, delete: true }
    },
    transferNumber: {
        type: Number,
        match: [/^\d+$/, 'Transfer number must be a valid number'],
        actions: { insert: true, update: true, delete: true }
    },
    transferBankName: {
        type: String,
        actions: { insert: true, update: true, delete: true }
    }
});

export const IncomePayments = model<IncomePaymentsModel>("IncomePayments", IncomePaymentsSchema);