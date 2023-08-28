import { Router } from 'express';
import { readdirSync } from 'fs';

const PATH_ROUTER = `${__dirname}/`;
const router = Router();

const cleanFileName = (fileName: string): string => {
    const file = fileName.split('.').shift()
    return file ? file : ''
}


readdirSync(PATH_ROUTER).filter(async (fileName) => {
    const cleanName = cleanFileName(fileName);
    console.log(`================ Loading route: ${cleanName}`);
    if(cleanName !== 'index') {
        const moduleRouter = await import(`./${cleanName}`);
        router.use(`/${cleanName}`, moduleRouter.router);
        console.log(`Loading route: ${cleanName}`);
    }
});

export { router };