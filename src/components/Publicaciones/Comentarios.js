import React from 'react'
import { connect } from 'react-redux'
import Spinner from '../General/Spiner'
import Fatal from '../General/Fatal'
const Comentarios = (props) => {
    if(props.com_error){
        return <Fatal error={props.com_error} />
    }
    if(props.com_cargando && !props.comentarios.length){
        return <Spinner/>
    }
    
    const ponerComentarios = () => (
        props.comentarios.map((comentario)=>(
            <li key={comentario.id}>
                <strong><u>{comentario.email}</u></strong>
                <br />{
                    comentario.body
                }
            </li>
        ))
    )

    return (
        <ul>
            {ponerComentarios()}
        </ul>
    )
}



const mapStateToProps = ({ publicacionesReducer }) => publicacionesReducer

export default connect(mapStateToProps)(Comentarios)