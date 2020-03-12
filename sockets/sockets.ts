import { Socket } from "socket.io";

export const desconectar = (cliente: Socket) => {
    cliente.on('disconect', () =>{
        console.log('desconectar');
    });
}

export const mensaje = (cliente: Socket, io: SocketIO.Server) =>{
    cliente.on('mensaje', ( payload:{de: string, cuerpo: string} )=>{
        console.log('Mensaje recibido', payload);

        io.emit('mensaje-nuevo', payload);
    });
}


export const usuario = (cliente: Socket, io: SocketIO.Server) => {
    cliente.on('configurar-usuario',( payload:{nombre: string}, callback: Function) => {

        console.log('Usuario nuevo', payload);

        callback({
            ok: true,
            mensaje: `Usuario ${payload.nombre}`
        })
        // io.emit('usuario-nuevo', payload);
    });
}