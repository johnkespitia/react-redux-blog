import React,{ Component } from 'react';
import { connect} from 'react-redux'
import * as usuariosAction from  '../../actions/usuariosAction'
import Spinner from '../General/Spiner';
import Fatal from '../General/Fatal';
import Tabla from './Tabla';

class Usuarios extends Component {

  componentDidMount(){
   // const response = await axios.get('https://jsonplaceholder.typicode.com/users')
   // this.setState({
   //   usuarios: response.data
   // })
   this.props.traerTodos();
  }

  ponerContenido = () =>{
    if(this.props.cargando){
      return <Spinner />
    }
    else if(this.props.error){
      return <Fatal error={this.props.error} />
    }
    else{
      return (
        <Tabla />
      );
    }
  }
  
  render(){
    return (
    <div>
      <h1>Usuarios</h1>
      {this.ponerContenido()}
    </div>
    );
  }
}

const mapStateToProps = (reducers) => {
  return reducers.usuariosReducer;
}

export default connect(mapStateToProps,usuariosAction)(Usuarios);
