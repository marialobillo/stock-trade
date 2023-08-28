import { Router, Request, Response } from 'express';
const router = Router();


/**
 * /blogs
 * GET: Get all blogs.
 */
router.get('/', (req: Request, res: Response) => {
    res.send({ data: 'GET: Get all users.' })
})


export { router };