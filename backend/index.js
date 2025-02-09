import express from "express"
import cors from "cors"
import 'dotenv/config'
import connectDB from "./config/mongodb.js"
import connectCloudinary from "./config/cloudinary.js"
import productRouter from "./routes/productRoutes.js"
import userRouter from "./routes/userRoutes.js"
import addessRouter from "./routes/addressroutes.js"
import reviewRouter from "./routes/reviewRoutes.js"
import cartRouter from "./routes/cartRoutes.js"

//app config

const app = express()
const port = process.env.PORT || 8000
connectDB()
connectCloudinary()

//middleware
app.use(express.json())
app.use(cors())

//api endpoints
app.use('/api/product', productRouter);
app.use('/api/user', userRouter);
app.use('/api/address', addessRouter);
app.use('/api/review', reviewRouter);
app.use('/api/cart', cartRouter);

app.get('/', (req, res) => {
  res.send("API WORKING");
})

app.listen(port, () => console.log("Server is running on port:" + port))