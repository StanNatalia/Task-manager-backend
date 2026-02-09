import { Router } from "express";
import * as controller from "../controllers/boards.controller";
import { validateBody } from "middlewares/validate";
import { createBoardSchema, updateBoardSchema } from "validation/boards";

const router = Router();

router.get("/", controller.getBoards);
router.post("/", validateBody(createBoardSchema), controller.createBoard);
router.get("/:boardId", controller.getBoard);
router.put(
  "/:boardId",
  validateBody(updateBoardSchema),
  controller.updateBoard,
);
router.delete("/:boardId", controller.deleteBoard);

export default router;
