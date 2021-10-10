const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    description: { type: String, required: true },
    mentor_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    student_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    }
}, {
    versionKey: false,
    timestamps: true
})

const Review = mongoose.model('review', reviewSchema);

module.exports = Review;