import mongoose from "mongoose";

const connectToDb = async ()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("connected to DB");
    } catch (error) {
        console.log(error.message);
        console.log(error);
    }
}

export default connectToDb