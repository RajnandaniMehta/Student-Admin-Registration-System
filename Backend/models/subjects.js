import mongoose from "mongoose";

const subjectSchema=new mongoose.Schema({
    semester: Number,
    subjectList: [
        {courseTitle: String}
    ]
});

export const Subject=mongoose.model("Subject",subjectSchema);