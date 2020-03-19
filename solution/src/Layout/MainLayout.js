import React from 'react'
import { Route, withRouter, Redirect } from 'react-router-dom'

import Header from '../Components/Header'

function MainLayout({
	component: Component,
	location,
	history,
	...rest
}) {

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
									<Header logged={false} />
									<Component
										history={history}
										logged={false}
										location={location}
										{...rest}
									/>
								</div>
							</div>
						</main>
					</div>
				)
			}}
		/>
	)
}

export default withRouter(MainLayout)