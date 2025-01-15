import mongoose from "mongoose";
const studentSchema = new mongoose.Schema({
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
    semester: {
        type: Number,
        // required: true,
        default : 1
    },
    password:{
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
export const Student=mongoose.model("Student",studentSchema);