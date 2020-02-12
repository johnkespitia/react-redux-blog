import { TRAER_TODOS, CARGANDO, ERROR } from "../types/PublicacionesTypes";

const INITIAL_STATE = {
    publicaciones: [],
    cargando:false,
    error: null
}

export default (state = INITIAL_STATE,action)=>{
    switch(action.type){
        case TRAER_TODOS:
            return { ...state, publicaciones: action.payload, cargando: false }
        case CARGANDO:
            return { ...state, cargando:true}
        case ERROR:
            return { ...state, error:action.payload, cargando:false}
        default: return state;
    }
}