import { Router, Request, Response } from 'express';
import MySQL from '../mysql/mysql';

const router = Router();

router.get('/heroes', (req: Request, res: Response) => {

    const query = `
        SELECT *
        FROM heroes`;

    MySQL.ejecutarQuery(query, (err: any, heroes: Object[]) => {
        if(err){
            res.status(400).json({
                ok: false,
                error: err
            })
        } else {
            res.json({
                ok: true,
                heroes
            })
        }
    });
})

router.get('/heroe/:id', (req: Request, res: Response) => {

    const id = req.params.id;
    // Esto me permite que cuando reciba el id no venga un id con caracteres raro ni nada que
    // no sea de la base de datos
    const escapeId = MySQL.instance.conection.escape(id); 

    const query = `
    SELECT *
    FROM heroes WHERE id = ${escapeId}`;

    MySQL.ejecutarQuery(query, (err: any, heroe: Object[]) => {
        if(err){
            res.status(400).json({
                ok: false,
                error: err
            })
        } else {
            res.json({
                ok: true,
                heroe: heroe[0]
            })
        }
    });

})

export default router;