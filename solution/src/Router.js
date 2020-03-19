import React from 'react'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import { Login, Home, Logout, CreateNew } from './Pages/index'

import MainLayout from './Layout/MainLayout'

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <MainLayout exact path="/login" component={Login} />
      <MainLayout exact path="/" component={Home} />
      <MainLayout exact path="/new" component={CreateNew} />
			<Route exact path="/logout" component={Logout} />
      <Route component={() => <div>Page not Found</div>} />
    </Switch>
  </BrowserRouter>
)

export default Routes
