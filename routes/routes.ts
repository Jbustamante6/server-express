import {Router, Request, Response} from 'express';


const router = Router();

router.get('/mensajes', (req: Request, res: Response) =>{
    res.json({
       ok: true,
       mensaje: 'todo ok' 
    });
});

router.post('/mensajes', (req: Request, res: Response) =>{

    const mensaje = req.body.mensaje;

    res.json({
       ok: true,
       mensaje 
    });
});

router.post('/mensajes/:id', (req: Request, res: Response) =>{

    const mensaje = req.body.mensaje;
    const id = req.params.id;
    res.json({
       ok: true,
       mensaje,
       id
    });
});


export default router;