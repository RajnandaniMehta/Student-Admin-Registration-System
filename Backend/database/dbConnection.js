import mongoose from "mongoose";

export const dbConnection=() =>{
    mongoose.connect(process.env.MONGO_URI, {
        dbName:"NIT_UTTARAKHAND"
    }).then( ()=> {
        console.log("Connected to database");
    }).catch(err => {
        console.log(`Some err occured ${err}`);
    });
};
