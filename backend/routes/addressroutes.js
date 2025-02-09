import { addAddress, deleteAddress, updateAddress, getAddresses } from "../controller/adressController.js";
import express from "express"
import authMiddleware from "../middleware/authMiddleware.js";

const addessRouter = express.Router();

addessRouter.post("/add", authMiddleware, addAddress);
addessRouter.get("/list", authMiddleware, getAddresses);
addessRouter.put("/update/:id", authMiddleware, updateAddress);
addessRouter.delete("/delete/:id", authMiddleware, deleteAddress);

export default addessRouter;