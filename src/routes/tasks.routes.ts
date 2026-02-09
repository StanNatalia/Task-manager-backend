import { Router } from "express";
import * as controller from "../controllers/tasks.controller";
import { validateBody } from "middlewares/validate";
import { createTaskSchema, moveTaskSchema } from "validation/tasks";
import { updateBoardSchema } from "validation/boards";

const router = Router({ mergeParams: true });

router.post("/:column", validateBody(createTaskSchema), controller.createTask);
router.put(
  "/:column/:taskId",
  validateBody(updateBoardSchema),
  controller.updateTask,
);
router.patch(
  "/tasks/:taskId/column",
  validateBody(moveTaskSchema),
  controller.moveTask,
);
router.delete("/:column/:taskId", controller.deleteTask);

export default router;
