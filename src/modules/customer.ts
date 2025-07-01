import { Schema, model, Document } from "mongoose";

export interface CustomerDocument extends Document {
    companyName: string;
    email: string;
    phone?: string;
    address?: string;
    companyNum: number; //מס חפ או עמ
}

const CustomerSchema = new Schema<CustomerDocument>(
    {
        companyName: {
            type: String,
            required: true,
            actions: { insert: true, update: true, delete: false }
        },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: {
                validator: function (v: string) {
                    // Simple email regex
                    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
                },
                message: (props: any) => `${props.value} is not a valid email!`
            },
            actions: { insert: true, update: true, delete: false }
        },
        phone: {
            type: String,
            validate: {
                validator: function (v: string) {
                    // Israeli phone number example: 05X-XXXXXXX or 0X-XXXXXXX
                    return /^0\d{1,2}-?\d{7}$/.test(v);
                },
                message: (props: any) => `${props.value} is not a valid phone number!`
            },
            actions: { insert: true, update: true, delete: false }
        },
        address: {
            type: String,
            actions: { insert: true, update: true, delete: true }
        },
        companyNum:{
            type: Number,
            required: true,
            actions: { insert: true, update: false, delete: false }
        }
    },

);

export const CustomerModel = model<CustomerDocument>("Customer", CustomerSchema);