const mongoose = require("mongoose");

const technicalQuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: [true, "Technical Question Is Required!"]
    },

    intention: {
        type: String, 
        required: [true, "Intention Is Required!"]
    },

    answer: {
        type: String,
        required: [true, "Answer IS Required!"]
    },
}, {
    _id: false
})

const behaviouralQuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: [true, "Behavioural Question Is Required!"]
    },

    intention: {
        type: String, 
        required: [true, "Intention Is Required!"]
    },

    answer: {
        type: String,
        required: [true, "Answer IS Required!"]
    },
}, {
    _id: false
})

const skillGapSchema = new mongoose.Schema({
    skill: {
        type: String,
        required: [true, "Skill Is Required!"]
    },

    severity: {
        type: String, 
        enum: [ "low", "medium", "high"],
        required: [true, "Severity Is Required!"]
    },
}, {
    _id: false
})

const preparationPlanSchema = new mongoose.Schema({
    day: {
        type: Number,
        required: [true, "Day Is Required!"]
    },

    focus: {
        type: String, 
        required: [true, "Focus Is Required!"]
    },

    tasks: [ {
        type: String,
        required: [true, "Tasks IS Required!"]
    } ]
})

const interviewReportSchema = new mongoose.Schema({
    jobDescription: {
        type: String,
        required: [true, "Job Description Is Required!"]
    },
    resume: {                    // Resume Ya Self description dono mein se koi ek to chahiye JD ke saath
        type: String,
    },
    selfDescription: {
        type: String,
    },
    matchScore: {
        type: Number,
        min: 0,
        max: 100,
    },

    technicalQuestions: [ technicalQuestionSchema ],
    behaviouralQuestions: [ behaviouralQuestionSchema ],
    skillGaps: [ skillGapSchema ],
    preparationPlan: [ preparationPlanSchema ],

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    
    title: {
        type: String,
        required: [true, "Job Title Is Required!"]
    }
}, {
    timestamps: true
})

const interviewReportModel = mongoose.model("InterviewReport", interviewReportSchema);

module.exports = interviewReportModel;