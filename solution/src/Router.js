import React from 'react'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import { Login, Home, Logout } from './Pages/index'

import MainLayout from './Layout/MainLayout'

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <MainLayout exact path="/login" component={Login} />
      <MainLayout exact path="/" component={Home} />
			<Route exact path="/logout" component={Logout} />
      <Route component={() => <div>Page not Found</div>} />
    </Switch>
  </BrowserRouter>
)

export default Routes
