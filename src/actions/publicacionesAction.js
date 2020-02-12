import Axios from "axios"
import { TRAER_TODOS, CARGANDO, ERROR } from "../types/PublicacionesTypes";


export const traerTodos = () => async (dispatch) => {
    dispatch({
        type: CARGANDO,
    })
    try {
        const respuesta = await Axios.get('https://jsonplaceholder.typicode.com/posts');
        dispatch({
            type: TRAER_TODOS,
            payload:respuesta
        })
    } catch (error) {
        dispatch({
            type: ERROR,
            payload: 'Algo salió mal, intente más tarde: '+error.message
        })
    }
    
}