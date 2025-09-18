import { Schema, model } from "mongoose";

const bookSchema = new Schema(
    {
    title: {
        type: String,
        trim: true,
        set: val => val.toLowerCase(),
        required: [true, 'Book title is required !'],
    },
    pages: {
        type: Number,
        min: [10, 'Book pages must be at least 10'],
        required: [true, 'Book pages is required !']
    },
    published_year: {   
        type: Number,
        required: [true, 'Published year is required !']
    },
    genre: {           
        type: String,
        trim: true,
        required: [true, 'Book genre is required !']
    },
    publisher: {       
        type: String,
        trim: true,
        required: [true, 'Publisher is required !']
    },
    author: {          
        type: Schema.Types.ObjectId,
        ref: "author",
        required: [true, 'Book author is required !']
    },
    description: {      
        type: String,
        trim: true,
        minlength: [20, 'Description must be at least 20 characters long'],
        required: [true, 'Book description is required !']
    },
    cover_image: {      
        type: String,
        trim: true,
        required: [true, 'Book cover image is required !']
    },
    period: {
        type: Schema.Types.ObjectId,
        ref: "category",
        required: [true, "Period is required !"]
    }
},{
    versionKey: false,
    timestamps: true
})

bookSchema.index({title: 'text'});

export default model('book', bookSchema);