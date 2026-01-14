import { Router } from 'express';
import { getAllCourses, getACourse, enrollCourse} from '../controllers/coursecontroller';
import { authMiddleware } from '../middlewares/authmiddleware';

const router = Router();

//GET /api/courses
/**
 * @openapi
 * /api/courses:
 *   get:
 *     summary: Get all courses
 *     tags:
 *       - Courses
 *     responses:
 *       200:
 *         description: List of courses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: number
 *                   title:
 *                     type: string
 *                   description:
 *                     type: string
 *                   price:
 *                     type: number
 */

router.get('/', getAllCourses);




router.post('/:id/enroll', authMiddleware,enrollCourse);




/**
 * @openapi
 * /api/courses/{id}:
 *   get:
 *     summary: Get course by id
 *     tags:
 *       - Courses
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         example: 1
 *     responses:
 *       200:
 *         description: Course detail
 *       404:
 *         description: Course not found
 */
router.get('/:id', getACourse);
export default router;