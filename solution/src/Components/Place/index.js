import React from 'react';
import './style.scss'


const Place = ({ id, city, name, slug, state, onEdit, ...props }) => {
	return (
		<div className="place">
			<div className="place-flex-container">
				<div className="card-header">
					<h1>{name}</h1>
					<h1>{id}</h1>
				</div>
				<div className="card-footer">
					<p className="info">{city}, {state} - {slug}</p>
					<p className="edit-button" onClick={onEdit}><i className="fas fa-pencil-alt"></i></p>
				</div>
			</div>
		</div>
	)
}

export default Place