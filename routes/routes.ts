import {Router, Request, Response} from 'express';


const router = Router();

router.get('/mensajes', (req: Request, res: Response) =>{
    res.json({
       ok: true,
       mensaje: 'todo ok' 
    });
});

router.post('/mensajes', (req: Request, res: Response) =>{
    res.json({
       ok: true,
       mensaje: 'POSTEADO' 
    });
});

export default router;