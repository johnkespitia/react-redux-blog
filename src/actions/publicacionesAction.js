import Axios from "axios"
import { TRAER_TODOS,TRAER_POR_USUARIO, CARGANDO, ERROR } from "../types/PublicacionesTypes";
import * as usuariosTypes from  '../types/UsuariosTypes'

const { TRAER_TODOS: USUARIOS_TRAER_TODOS } = usuariosTypes

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

export const traerPorUsuario = (key)=> async (dispatch, getState)=>{
    
    const {usuarios}=getState().usuariosReducer;
    const {publicaciones}=getState().publicacionesReducer;
    console.log(usuarios);
    const usuario_id = usuarios[key].id
    const respuesta = await Axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${usuario_id}`)
    
    const publicaciones_actualizadas = [
        ...publicaciones,
        respuesta.data
    ]

    const publicaciones_key = publicaciones_actualizadas.length - 1
    
    const usuarios_actualizados = [...usuarios]
    
    usuarios_actualizados[key] = {
        ...usuarios[key],
        publicaciones_key
    }

    dispatch({
        type: USUARIOS_TRAER_TODOS,
        payload: usuarios_actualizados
    })

    dispatch({
        type: TRAER_POR_USUARIO,
        payload:publicaciones_actualizadas
    })
}