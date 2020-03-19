import Axios from "axios";
import { TRAER_TODAS, CARGANDO, ERROR } from '../types/TareasTypes'

export const traerTodas = () => async(dispatch) => {
    dispatch({
        type: CARGANDO,
    })
    try {
        const response = await Axios.get('https://jsonplaceholder.typicode.com/todos')   
        const tareas = {}
        response.data.map((tar)=>(
            tareas[tar.userId] = {
                ...tareas[tar.userId],
                [tar.id]:{
                    ...tar
                }
            }
        )); 
        dispatch({
            type: TRAER_TODAS,
            payload: tareas
        })
    } catch (error) {
        dispatch({
            type: ERROR,
            payload: 'Información de tareas no disponible, intente más tarde: '+error.message
        })
    }
};

export const cambioUsuarioId = ()=>(dispatch)=>{
    dispatch({
        type: 'cambio_usuario_id',
        payload: 2
    })
}