import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        toUpperCase: true,
        trim: true
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        toLowerCase: true,
        unique: [true, "Email already exists"], 
        trim: true,
        match: [
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            "Value is not email"
        ]
    },
    password: {
        type: String,
        required: true,
        minLength: [3, "Minimal insertion simbols only 3 symbol"],
        maxLength: [8, "Maxsimal insertion symbols only 8 symbol"]
    },
    age: {
        type: Number,
        required: true,
        min: [18, "Minimal age is 18"],
        max: [50, "Maximal age is 50"],
    },
    gender: {
        type: String,
        required: true,
        // enum: ['male', 'female'],
        enum: {
            values: ['male', 'female'],
            message: 'Bunday jins mavjud emas'
        },
        defaul: 'male'
    },
    role_id: {
        type: Number,
        enum: [1, 2]
    }
}, {
    versionKey: false,
    timestamps: true
})

export default model('user', userSchema);