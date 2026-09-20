const express = require("express")
const authMiddleware = require("../middlewares/auth.middleware")
const interviewController = require("../controllers/interview.controller")
const upload = require("../middlewares/file.middleware")

const interviewRouter = express.Router()


//Route - POST /api/interview/
//access - Private
interviewRouter.post("/", authMiddleware.authUser, upload.single("resume"), interviewController.generateInterviewReportController)


//Route - GET /api/interview/report/:interviewId
//For getting Interview Report By Interview Id 
//Access: Private

interviewRouter.get("/report/:interviewId", authMiddleware.authUser, interviewController.getInterviewReportByIdController)


//Route - GET /api/interview
//For getting all Interview Report of a logged in user
//Access: Private

interviewRouter.get("/", authMiddleware.authUser, interviewController.getAllInterviewReportsController)


//Route - GET /api/interview/resume/pdf
//Access - Private
interviewRouter.post("/resume/pdf/:interviewReportId", authMiddleware.authUser, interviewController.generateResumePdfController)

module.exports = interviewRouter