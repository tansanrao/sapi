import express from "express";
import GatewayController from "../controllers/Gateway";

const router = express.Router();

router.get("/", GatewayController.getAll);
router.get("/:id", GatewayController.getOne);
router.post("/", GatewayController.create);
router.put("/:id", GatewayController.update);
router.delete("/:id", GatewayController.delete);

export default router;
