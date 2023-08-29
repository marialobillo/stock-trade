import { Request, Response } from 'express';
import { readFile } from 'fs/promises';

const symbolsController = async (req: Request, res: Response) => {
    try {
        let rawDataSymbols = await readFile('./symbols.json', 'utf-8');
        let symbols = JSON.parse(rawDataSymbols);
        res.status(200).json(symbols);
        console.log('Hello Symbols', symbols)
    } catch (error) {
        console.log('Errors in symbolsController: ', error)
    }
}

export {
    symbolsController,
}