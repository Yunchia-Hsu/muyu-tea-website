import { Request, Response, NextFunction } from "express";
import * as courseService from "../services/courseservice";

export const getAllCourses = async(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const courses = await courseService.getAllCourses();
        res.status(200).json(courses);
    } catch (error) {
        next(error);
    }
};

// Extract course ID from slug (e.g., "1-tea-brewing" → 1)
function extractCourseId(param: string): number {
    return parseInt(param.split('-')[0], 10);
}

export const enrollCourse = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
    try{
        const userId = (req as any).user!.userId;

        const courseId = extractCourseId(req.params.id);
        if (isNaN(courseId)) {
            res.status(400).json({ message: 'Invalid course ID' });
            return;
        }
        const enrollment = await courseService.enrollCourse(userId, courseId);
        res.status(201).json({message: 'Enrolled successfully', enrollment});
    }catch(error){
        next(error);
    }
};

export const getACourse = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const courseId = extractCourseId(req.params.id);
        if (isNaN(courseId)) {
            res.status(400).json({ message: 'Invalid course ID' });
            return;
        }
        const course = await courseService.getACourse(courseId);
        res.status(200).json(course);
    }catch(error){
        next(error);
    }

};


