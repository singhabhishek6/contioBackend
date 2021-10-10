const mongoose = require("mongoose")

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    age: { type: Number, required: false },
    gender: { type: String, required: false },
    email: { type: String, required: true },
    avatar: { type: String, required: false },
    bio: { type: String, required: false },
    about: { type: String, required: false },
    proficiency: [{ type: String, required: false }],
    isOnline: { type: Boolean, required: false, default: false },
    state: { type: String, required: false },
    password: { type: String, required: false },
    teacher_review: { type: Number, required: false, default: 2 },
    student_review: { type: Number, required: false, default: 2 },
    review_count: { type: Number, required: false, default: 1}
}, {
    versionKey: false,
    timestamps: true,
  }
)

const User = mongoose.model("user", userSchema)

module.exports = User
