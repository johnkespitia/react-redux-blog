import React,{Component} from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import * as tareasAction from '../../actions/tareasAction'
import Spinner from '../General/Spiner'
import Fatal from '../General/Fatal'

class Tareas extends Component{
    componentDidMount(){
        this.props.traerTodas()
    }

    mostrarContenido=()=>{
        const {tareas, cargando, error} = this.props
        if(cargando){
            return <Spinner />
        }

        if(error){
            return <Fatal error={error} />
        }

        return Object.keys(tareas).map((usua_id)=>(
        <div key={usua_id}>
            <h2>Usuario {usua_id}</h2>
            <div className="contenedor_tareas">
                {this.ponerTareas(usua_id)}
            </div>
        </div>

        ))
    }


    ponerTareas=(usu_id)=>{
        const {tareas} = this.props
        const por_usuario = {
            ...tareas[usu_id]
        }

        return Object.keys(por_usuario).map((tar_id)=>(
            <div key={ tar_id }>
				<input type='checkbox'
					defaultChecked={ por_usuario[tar_id].completed }
				/>
				{ por_usuario[tar_id].title }
			</div>
        ))
    }

    render(){
    return <div>
        <button>
            <Link to="/tareas/guardar">
                Agregar
            </Link>
        </button>
        {this.mostrarContenido()}
        </div>
    }
}

const mapsStatesToProps = ({tareasReducer}) => tareasReducer;

export default connect(mapsStatesToProps, tareasAction)(Tareas)