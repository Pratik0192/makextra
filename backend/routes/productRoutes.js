import { addProduct, removeProduct, listProducts, singleProduct, updateProduct } from "../controller/productController.js";
import express from "express"
import upload from "../middleware/multer.js";

const productRouter = express.Router();

productRouter.post("/add", upload.fields([{name:'image1', maxCount: 1}, {name:'image2', maxCount: 1}, {name:'image3', maxCount: 1}, {name:'image4', maxCount: 1}, {name:'image5', maxCount: 1}, {name:'image6', maxCount: 1}]), addProduct);
productRouter.post("/remove", removeProduct);
productRouter.post("/single", singleProduct);
productRouter.get("/list", listProducts);
productRouter.put('/update/:productId', upload.fields([
    { name: 'image1', maxCount: 1 }, { name: 'image2', maxCount: 1 }, 
    { name: 'image3', maxCount: 1 }, { name: 'image4', maxCount: 1 },
    { name: 'image5', maxCount: 1 }, { name: 'image6', maxCount: 1 }
  ]), updateProduct);

export default productRouter