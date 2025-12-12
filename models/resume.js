import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema({
    resumeText: {
        type: String,
        required: true
    },
    aiFeedback: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Resume = mongoose.model("Resume", resumeSchema);

export default Resume;