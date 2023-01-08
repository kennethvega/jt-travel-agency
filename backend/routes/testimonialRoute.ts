import {
  createTestimonial,
  deleteTestimonial,
  getAllTestimonial,
  getTestimonial,
  updateTestimonial,
} from "./../controller/testimonialController";
import { protect } from "./../middleware/authMiddleware";
import express from "express";
import { upload } from "../utils/fileUpload";
const router = express.Router();

router.post("/", protect, upload.single("image"), createTestimonial);
router.patch("/:id", protect, upload.single("image"), updateTestimonial);
router.get("/", getAllTestimonial);
router.get("/:id", protect, getTestimonial);
router.delete("/:id", protect, deleteTestimonial);

export default router;
