"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const coursecontroller_1 = require("../controllers/coursecontroller");
const authmiddleware_1 = require("../middlewares/authmiddleware");
const router = (0, express_1.Router)();
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
router.get('/', coursecontroller_1.getAllCourses);
router.post('/:id/enroll', authmiddleware_1.authMiddleware, coursecontroller_1.enrollCourse);
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
router.get('/:id', coursecontroller_1.getACourse);
exports.default = router;
