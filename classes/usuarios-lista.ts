import { Usuario } from './usuario';
export class UsuariosLista{

    lista:Usuario[] = [];  
    
    constructor(){}

    public agregar(usuario:Usuario) {

        this.lista.push(usuario);
        // console.log(this.lista);
        return usuario;
    }

    public setNombre(id:string, nombre:string) {
        for (let usuario of this.lista) {
            if(usuario.id == id) {
                usuario.nombre = nombre;
                break;
            }
        }
        // console.log(this.lista)
    }

    public getLista() {
        return this.lista.filter( usuario =>  usuario.nombre !== 'sin-nombre' );
    }

    public getUsuario(id:string) {
        return this.lista.find( usuario => usuario.id === id );
    }

    public usuariosSala(sala:string){
        return this.lista.filter( usuario => usuario.sala === sala);
    } 

    public borrarUsuario(id:string) {
        const tempUser = this.getUsuario(id);
        this.lista = this.lista.filter( usuario => usuario.id !== id );
        // console.log(this.lista);
        return tempUser;
    }
}