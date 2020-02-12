import React,{ Component } from 'react';
import {connect} from 'react-redux'
import * as usuariosAction from  '../../actions/usuariosAction'
import * as publicacionesAction from  '../../actions/publicacionesAction'

const { traerTodos: usuariosTraerTodos } = usuariosAction;
const { traerTodos: publicacionesTraerTodos } = publicacionesAction;

class Publicaciones extends Component {

    componentDidMount(){
        if(!this.props.usuariosReducer.usuarios.length){
            this.props.usuariosTraerTodos();
        }
    }

    render(){
        return (<div>
            <h1>Publicaciones de </h1>
            {this.props.match.params.key}
        </div>)
    }
}

const mapStateToProps = ({usuariosReducer, publicacionesReducer })=>{
    return {usuariosReducer, publicacionesReducer };
}
const mapDispatchProps = {
    usuariosTraerTodos, 
    publicacionesTraerTodos
}
export default connect(mapStateToProps,mapDispatchProps)(Publicaciones);