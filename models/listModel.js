import mongoose from 'mongoose';

const listSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'List name is required'],
        trim: true,
        minlength: [3, 'Name must be at least 3 characters long']
    },
    titles: {
        type: [String],
        required: [true, 'List of titles is required'],
        validate: {
            validator: function (arr) {
                return arr.length > 0 && arr.every(title => title.length >= 3);
            },
            message: 'Each title must be at least 3 characters long and list must contain at least one title.'
        }
    },
    images: {
        type: [String],
        required: [true, 'List of image URLs is required'],
        validate: {
            validator: function (arr) {
                return arr.length > 0;
            },
            message: 'List must contain at least one image URL.'
        }
    },
    description: {
        type: String,
        trim: true,
        maxlength: [1000, 'Description cannot exceed 1000 characters']
    },
    tags: {
        type: [String],
        trim: true,
        default: []
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

