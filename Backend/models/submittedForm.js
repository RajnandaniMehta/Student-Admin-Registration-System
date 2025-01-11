import mongoose from "mongoose";
const submissionSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    id:{
        type:Number,
        required:true
    },
    rollno:{
        type:String,
        required:true
    },
    fatherName:{ type:String},
    permanentAddress:{type:String},
    parentMobNo:{type:Number},
    parentEmail:{type:String},
    presentAddress:{type:String,
        required:true
    },
    studentNo:{type:Number,
        required:true
    },
    studentEmail:{ type:String,
        required:true
    },
    subjects: [String],
    formStatus: { type: String, default: 'Pending' }
});
export const Submission = mongoose.model('Submission', submissionSchema);