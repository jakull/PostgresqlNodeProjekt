import express, { Express, Request, Response } from "express";
import {getTasks} from '../controllers/taskController';

const router = express.Router();

/**
 * @openapi
 * /healthcheck:
 *  get:
 *     tags:
 *     - Healthcheck
 *     description: Responds if the app is up and running
 *     responses:
 *       200:
 *         description: App is up and running
 */
router.get("/healthcheck", (req: Request, res: Response) => res.sendStatus(200));

router.get('/angestellte', getTasks);
/*router.get('/angestellte/:id', taskController.getTask);
router.post('/angestellte', taskController.createTask);
router.put('/angestellte/:id', taskController.updateTask);
router.delete('/angestellte/:id', taskController.deleteTask);
*/

export default router;
