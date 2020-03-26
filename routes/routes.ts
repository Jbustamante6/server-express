import {Router, Request, Response} from 'express';
import Server from '../classes/server';


const router = Router();

router.get('/mensajes', (req: Request, res: Response) =>{
    res.json({
       ok: true,
       mensaje: 'todo ok' 
    });
});

router.post('/mensajes', (req: Request, res: Response) =>{

    const cuerpo = req.body.mensaje;
    const de = req.body.de
    const server = Server.instace;
    const payload = {
        de: de,
        cuerpo: cuerpo
    }
    server.io.emit('mensaje-nuevo', payload);
    res.json({
       ok: true,
       cuerpo,
       de
    });
});

router.post('/mensajes/:id', (req: Request, res: Response) =>{

    const mensaje = req.body.mensaje;
    const id = req.params.id;
    const de = req.body.de
    const server = Server.instace;

    const payload = {
        de: de,
        mensaje: mensaje
    }
    server.io.in(id).emit('mensaje-privado', payload);
    res.json({
       ok: true,
       mensaje,
       id,
       de,
       
    });
});


export default router;