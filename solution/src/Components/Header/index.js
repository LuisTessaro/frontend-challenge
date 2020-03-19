import React from 'react'
import './style.scss'

import { Link, withRouter } from 'react-router-dom'


const Header = ({ history, logged, ...props }) => {
	return (
		<header className="header">
			<nav>
				{!logged ?
					(<ul>
						<li className="active"><Link to="/login">Login</Link></li>
					</ul>)
					:
					(<ul>
						<li><Link to="/">Meus Lugares</Link></li>
						<li><Link to="/new">Novo Lugar</Link></li>
						<li><Link to="/logout">Logout</Link></li>
					</ul>)
				}
			</nav>
		</header>
	)
}

export default withRouter(Header)