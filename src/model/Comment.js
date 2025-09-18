import { Schema, model } from "mongoose";

const commentSchema = new Schema({
    commenter: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: [true, "Commenter id is required"]
    },
    book: {
        type: Schema.Types.ObjectId,
        ref: "book",
        required: [true, "Book id is required"]
    },
    comment: {
        type: String,
        trim: true,
        minlength: [10, 'Comment must be at least 10 characters long'],
        required: [true, "You must insert comment"]
    }
}, {
    versionKey: false,
    timestamps: true
});

export default model('comment', commentSchema);