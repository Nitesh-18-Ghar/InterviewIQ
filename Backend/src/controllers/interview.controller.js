const pdfParse = require("pdf-parse")
const { generateInterviewReport, generateResumePdf } = require("../services/ai.service")
const interviewReportModel = require("../models/interviewReport.model")

async function generateInterviewReportController(req, res){

    const resumeContent = await (new pdfParse.PDFParse(Uint8Array.from(req.file?.buffer))).getText()
    const { selfDescription, jobDescription } = req.body

    const interviewReportByAI = await generateInterviewReport({
        resume: resumeContent.text,
        selfDescription,
        jobDescription
    })

    const InterviewReport = await interviewReportModel.create({
        title: interviewReportByAI?.title || "Untitled Position",
        user: req.user.id,
        resume: resumeContent.text,
        selfDescription,
        jobDescription,
        ...interviewReportByAI
    })

    res.status(201).json({
        message: 'Interview Report Generated Successfully!',
        InterviewReport
    })
}

async function getInterviewReportByIdController(req, res) {
    const { interviewId } = req.params

    const InterviewReport = await interviewReportModel.findOne({ _id: interviewId, user: req.user.id })

    if (!InterviewReport) {
        return res.status(404).json({
            message: "Interview Report Not Found.",
        })
    }
    res.status(200).json({
        message: "Interview Report Fetched Successfully.",
        InterviewReport
    })
}

async function getAllInterviewReportsController(req, res) {
    const InterviewReports = await interviewReportModel.find({ user: req.user.id }).sort({ createdAt: -1 }).select("-resume -selfDescription -jobDescription -__v -technicalQuestions -behaviouralQuestions -skillGaps -preparationPlan")

    res.status(200).json({
        message: "Interview Reports Fetched Successfully.",
        InterviewReports
    })
}

async function generateResumePdfController(req, res){
    const { interviewReportId } = req.params
    const interviewReport = await interviewReportModel.findById(interviewReportId)

    if (!interviewReport) {
        return res.status(404).json({
            message: "Interview Report Not Found."
        })
    }

    const { resume, selfDescription, jobDescription } = interviewReport

    const pdfBuffer = await generateResumePdf({ resume, selfDescription, jobDescription })

    res.set({
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename = resume_${interviewReportId}.pdf`
    })

    res.send(pdfBuffer)
}


module.exports = { generateInterviewReportController, getInterviewReportByIdController, getAllInterviewReportsController, generateResumePdfController }