import React from 'react'
import { Route, withRouter, Redirect } from 'react-router-dom'

import Header from '../Components/Header'

import EditModal from '../Components/EditModal'
import { useModal } from '../Hooks/useModal'

function MainLayout({
	component: Component,
	location,
	history,
	...rest
}) {
	const path = location.pathname
	const token = localStorage.getItem('auth_token')
	const logged = token ? true : false

	const editModal = useModal()
	
	if (logged) {
		if (path === '/login') {
			return <Redirect to="/" />
		}
	} else {
		if (path === '/' || path === '/new') {
			return <Redirect to="/login" />
		}
	}
	return (
		<Route
			{...rest}
			render={props => {
				return (
					<div>
						<main>
							<div className="flex-container">
								<div className="logo-container">
									<img className="logo-img" src="/imgs/map.png" alt="Logo" />
									<h1>Lugares</h1>
									<p>UI simples para interação com uma API que guarda lugares pelo mundo.</p>
								</div>

								<div className="dashboard-container">
									<Header logged={logged} />
									<Component
										history={history}
										logged={logged}
										location={location}
										{...rest}
									/>
								</div>
							</div>
						</main>
						<EditModal {...editModal.getProps()} />
					</div>
				)
			}}
		/>
	)
}

export default withRouter(MainLayout)