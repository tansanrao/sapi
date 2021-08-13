import express from "express";
import UserController from "../controllers/User";

const router = express.Router();

router.get("/", UserController.getAll);
router.get("/:id", UserController.getOne);
router.post("/", UserController.create);
router.put("/:id", UserController.update);
router.delete("/:id", UserController.delete);

export default router;
