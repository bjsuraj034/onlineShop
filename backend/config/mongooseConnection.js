import mongoose from "mongoose"
const db=async()=>{
    try {
      mongoose.connection.on('connected',()=>{
        console.log('Database Connected sucessfully')
      })
      await mongoose.connect(`${process.env.MONGOOSE_URL}`)
        
    } catch (error) {
        console.log(error.message)
        process.exit(1)
        
    }

}
export default db