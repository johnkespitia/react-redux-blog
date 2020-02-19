import React,{ Component } from 'react';
import {connect} from 'react-redux'
import * as usuariosAction from  '../../actions/usuariosAction'
import * as publicacionesAction from  '../../actions/publicacionesAction'
import Spinner from '../General/Spiner';
import Fatal from '../General/Fatal';


const { traerTodos: usuariosTraerTodos } = usuariosAction;
const { traerPorUsuario: publicacionesTraerPorUsuario } = publicacionesAction;

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
            return;
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
        
        if(usuariosReducer.cargando){
            return <Spinner/>
        }
        if(usuariosReducer.error){
            return <Fatal mensaje={ usuariosReducer.error } />;
        }
        const nombre = usuariosReducer.usuarios[key]
        return (
            <h1>Publicaciones de </h1>
            {key}
        )
    }

    render(){
        return (<div>
            
            {this.ponerUsuario()}
        </div>)
    }
}

const mapStateToProps = ({usuariosReducer, publicacionesReducer })=>{
    return {usuariosReducer, publicacionesReducer };
}
const mapDispatchProps = {
    usuariosTraerTodos, 
    publicacionesTraerPorUsuario
}
export default connect(mapStateToProps,mapDispatchProps)(Publicaciones);