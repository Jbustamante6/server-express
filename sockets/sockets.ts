import { Socket } from "socket.io";
import { UsuariosLista } from '../classes/usuarios-lista';
import { Usuario } from '../classes/usuario';


export const usuariosConectados = new UsuariosLista();


export const conectar = (cliente: Socket) => {

    const usuario  = new Usuario(cliente.id);
    usuariosConectados.agregar(usuario);

};


export const desconectar = (cliente: Socket) => {
    cliente.on('disconnect', () =>{
        console.log('desconectar');
        usuariosConectados.borrarUsuario(cliente.id);
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
        
        callback({
            ok: true,
            mensaje: `Usuario ${payload.nombre}`
        })
        // io.emit('usuario-nuevo', payload);
    });
   
}


