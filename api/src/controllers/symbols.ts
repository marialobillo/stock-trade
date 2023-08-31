import { Request, Response } from 'express';
import { readFile } from 'fs/promises';
import { handleHttp } from '../utils/error.handle';

const symbolsController = async (req: Request, res: Response) => {
    try {
        const rawDataSymbols = await readFile('./symbols.json', 'utf-8');
        const symbols = JSON.parse(rawDataSymbols);
        res.status(200).json(symbols);
        console.log('Hello Symbols', symbols)
    } catch (error) {
        handleHttp(res, 'ERROR_GETTING_SYMBOLS')
    }
}

export {
    symbolsController,
}