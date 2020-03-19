import React, { Component } from 'react';

import { connect } from 'react-redux'

import *  as tareasActions from '../../actions/tareasAction'

class Guardar extends Component {
	render() {
		return (
			<div>
				<h1>Guardar Tarea</h1>
				Usuario id:
                <input type='number' value={this.props.usuario_id}
                onChange={this.props.cambioUsuarioId}
                />
				<br /><br />
				Título:
				<input value={this.props.title}/>
				<br /><br />
				<button>
					Guardar
				</button>
			</div>
		);
	}
}


const mapStateToProps = ({tareasReducer}) => tareasReducer

export default connect(mapStateToProps, tareasActions)(Guardar);