import express from "express"
import { addBanner, deleteBanner, getBanners } from "../controller/bannerController.js"
import upload from "../middleware/multerBanner.js"

const bannerRouter = express.Router();

bannerRouter.post('/add', upload.single("image"), addBanner);
bannerRouter.get('/all', getBanners);
bannerRouter.delete('/delete/:id', deleteBanner);

export default bannerRouter