import { Socket } from "socket.io";
import { UsuariosLista } from '../classes/usuarios-lista';
import { Usuario } from '../classes/usuario';
import socketIO from 'socket.io';


export const usuariosConectados = new UsuariosLista();


export const conectar = (cliente: Socket) => {

    const usuario  = new Usuario(cliente.id);
    usuariosConectados.agregar(usuario);
    


};


export const desconectar = (cliente: Socket, io: socketIO.Server) => {
    cliente.on('disconnect', () =>{
        console.log('desconectar');
        usuariosConectados.borrarUsuario(cliente.id);
        io.emit('usuarios-activos', usuariosConectados.getLista());
    });
}

export const mensaje = (cliente: Socket, io: SocketIO.Server) =>{
    cliente.on('mensaje', ( payload:{de: string, cuerpo: string} )=>{
        // console.log('Mensaje recibido', payload);

        io.emit('mensaje-nuevo', payload);
    });
}


export const usuario = (cliente: Socket, io: SocketIO.Server) => {
    cliente.on('configurar-usuario',( payload:{nombre: string}, callback: Function) => {

        console.log('Usuario nuevo', payload, cliente.id);
        usuariosConectados.setNombre(cliente.id, payload.nombre);
        io.emit('usuarios-activos', usuariosConectados.getLista());
        callback({
            ok: true,
            mensaje: `Usuario ${payload.nombre}`
        })
        // io.emit('usuario-nuevo', payload);
    });
   
}


export const obtenerUsuarios = (cliente: Socket, io: SocketIO.Server) => {
    cliente.on('obtener-usuarios',() => {
        // usuariosConectados.setNombre(cliente.id);
        io.to(cliente.id).emit('usuarios-activos', usuariosConectados.getLista());
    });
   
}



