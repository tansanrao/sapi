import express from "express";
import MessageController from "../controllers/Message";

const router = express.Router();

router.get("/", MessageController.getAll);
router.get("/:id", MessageController.getOne);
router.post("/", MessageController.create);
router.delete("/:id", MessageController.delete);

export default router;
