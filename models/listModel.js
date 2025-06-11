import mongoose from 'mongoose';

const listSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'List title is required'],
        trim: true,
        minlength: [3, 'Title must be at least 3 characters long']
    },
    image: {
        type: String,
        required: [true, 'List image URL is required'],
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId, 
        required: true, 
        ref: 'User' 
    }
}, {
    timestamps: true
});

const List = mongoose.model('List', listSchema);

export default List;