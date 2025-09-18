import { Schema, model } from 'mongoose';

const authorSchema = new Schema({
    full_name: {
        type: String,
        required: [true, "Author full_name is required !"],
        trim: true,
        set: val => val.toLowerCase(),
        unique: [true, "Author full_name already exists !"],
        validate: {
            validator(val) {
                return val !== null && val !== ""
            },
            message: "Author full_name cannot be null or empty!"
        }
    },
    date_of_birth: {
        type: Date,
        required: [true, "Author date_of_birth is required"],
        validate: {
            validator(val) {
                return val !== null && val !== ""
            },
            message: "Author date_of_birth cannot be null or empty!"
        }
    },
    date_of_death: {
        type: Date,
        default: null
    },
    bio: {
        type: String,
        required: [true, "Author bio is required!"],
        trim: true,
        minlength: [10, "Bio must be at least 10 characters long"]
    },
    years_active: {
        type: String, // masalan: "1990-2020".
        trim: true,
        required: [true, "Years active is required!"]
    },
    photo: {
        type: String,
        trim: true,
    },
    period: {
        type: Schema.Types.ObjectId,
        ref: "category",
        required: [true, "Period is required !"]
    }
}, {
    versionKey: false,
    timestamp: true
})

authorSchema.index({full_name: 'text'})

export default model('author', authorSchema);
