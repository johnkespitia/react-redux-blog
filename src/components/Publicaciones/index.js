import React,{ Component } from 'react';
import {connect} from 'react-redux'
import * as usuariosAction from  '../../actions/usuariosAction'
import * as publicacionesAction from  '../../actions/publicacionesAction'
import Spinner from '../General/Spiner';
import Fatal from '../General/Fatal';
import Comentarios from './Comentarios';


const { traerTodos: usuariosTraerTodos } = usuariosAction;
const { 
    traerPorUsuario: publicacionesTraerPorUsuario, 
    abrirCerrar:abrirCerrarPubs ,
    traerComentarios
} = publicacionesAction;

class Publicaciones extends Component {

    async componentDidMount(){
        const {
			usuariosTraerTodos,
			match: { params: { key } },
			publicacionesTraerPorUsuario
		} = this.props;
        if(!this.props.usuariosReducer.usuarios.length){
           await usuariosTraerTodos();
        }
        
        if(this.props.usuariosReducer.error){
            return <Fatal error={this.props.usuariosReducer.error} />;
        }
        if(!('publicaciones_key' in this.props.usuariosReducer.usuarios[key])){
            publicacionesTraerPorUsuario(key);
        }
    }

    ponerUsuario = () => {
        const {
			match: { params: { key } },
			usuariosReducer
        } = this.props;

        if(usuariosReducer.error){
            return <Fatal error={ usuariosReducer.error } />;
        }
        
        if(!usuariosReducer.usuarios.length || usuariosReducer.cargando){
            return <Spinner/>
        }
        
        const nombre = usuariosReducer.usuarios[key].name
        return (
        <h1>Publicaciones de {nombre}</h1>
        )
    }

    ponerPublicaciones= () => {
        const {
            usuariosReducer,
            usuariosReducer: { usuarios },
            publicacionesReducer,
            publicacionesReducer:{ publicaciones },
            match: { params: { key } }
        } = this.props

        if (!usuarios.length){
            return;
        }
        if( usuariosReducer.error){
            return;
        }
        if ( publicacionesReducer.cargando ){
            return <Spinner/>
        }
        if( publicacionesReducer.error){
            return <Fatal error={publicacionesReducer.error} />
        }

        if( !publicaciones.length){
            return;
        }
        if(!('publicaciones_key' in this.props.usuariosReducer.usuarios[key])){
            return;
        }

        const { publicaciones_key } = usuarios[key]
        return this.mostrarInfo(publicaciones, 
            publicaciones_key)

    }

    mostrarInfo = (publicaciones, pub_key) => (
        publicaciones[pub_key].map(
            (publicacion, com_key)=>(
                <div className="pub_titulo" key={publicacion.id} 
                onClick={ ()=>this.mostrarComentarios(pub_key, com_key, publicacion.comentarios) }>
                    <h2 >
                        { publicacion.title}
                    </h2>
                    <h3>
                        { publicacion.body }
                    </h3>
                    { 
                    (publicacion.abierto) ? <Comentarios comentarios={publicacion.comentarios} /> : ""
                    }
                </div>
            )
        )

    );

    mostrarComentarios = ( pub_key,com_key, comentarios )=>{
        this.props.abrirCerrarPubs(pub_key, com_key)
        if(!comentarios.length){
            this.props.traerComentarios(pub_key, com_key)
        }
    }

    render(){
        return (<div>
            
            {this.ponerUsuario()}
            {this.ponerPublicaciones()}
        </div>)
    }
}

const mapStateToProps = ({usuariosReducer, publicacionesReducer })=>{
    return {usuariosReducer, publicacionesReducer };
}
const mapDispatchProps = {
    usuariosTraerTodos, 
    publicacionesTraerPorUsuario,
    abrirCerrarPubs,traerComentarios
}
export default connect(mapStateToProps,mapDispatchProps)(Publicaciones);