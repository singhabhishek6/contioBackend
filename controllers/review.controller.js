const express = require('express');
const Review = require('../models/review.model');
const User = require('../models/user.model');

const router = express.Router();

router.get('/:id', async (req, res) => {
    try {
        let page = +req.params.page || 1;
        let per_page = +req.params.limit || 10;
        let offset = (page - 1) * per_page;

        const reviews = await Review.find({ mentor_id: req.params.id }).skip(offset).limit(per_page).populate("student_id").lean().exec();
        let totalUsers = await Review.find({ mentor_id: req.params.id }).countDocuments();

        const totalPages = Math.ceil(totalUsers / per_page);

        return res.status(200).json({ reviews, totalPages })
    }
    catch (err) {
        return res.status(400).json({ status: "failed", message: err.message });
    }
})

router.post('/:id', async (req, res) => {
    try {
        req.body.mentor_id = req.params.id;
        
        let user = await User.findById(req.params.id).lean().exec();
        let rating_count = user.review_count || 1;
        
        console.log(user,rating_count);
        let newRating = ((user.teacher_review * rating_count) + req.body.rating) / (rating_count + 1)


        user = await User.findByIdAndUpdate(req.params.id, {teacher_review: newRating.toFixed(1), review_count: rating_count + 1}, {new: true});

        const review = await Review.create(req.body);

        return res.status(200).json({ review });
    }
    catch (err) {
        return res.status(400).json({ status: "failed", message: err.message });
    }
})

router.patch('/:id', async (req, res) => {
    try {
        const review = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true });

        return res.status(200).json({ review });
    }
    catch (err) {
        return res.status(400).json({ status: "failed", message: err.message });
    }
})

router.delete('/:id', async (req, res) => {
    try {
        await Review.findByIdAndDelete(req.params.id);

        return res.status(200).json({ status: "success" });
    }
    catch (err) {
        return res.status(400).json({ status: "failed", message: err.message });
    }
})

module.exports = router;