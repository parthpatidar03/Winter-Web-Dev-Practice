import { Route, Switch } from 'wouter'
import { UserList } from './components/UserList'
import { UserDetail } from './components/UserDetail'
import { AddUser } from './components/add_User_component'
import { EditUser } from './components/edit_User_Details'
import { DeleteUser } from './components/delete_User_details'
import { Login } from './components/Login'
import { Register } from './components/Register'
import { Navbar } from './components/Navbar'
import './app.css'
import axios from 'axios'; 

// Configure Axios to always send cookies
axios.defaults.withCredentials = true; // tells the browser "Please send cookies to the server."

export function App() {
  return (
    <div>
      <Navbar />
      <Switch>
        <Route path="/" component={UserList} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/add-user" component={AddUser} />
        <Route path="/users/:id" component={UserDetail} />
        <Route path="/users/:id/edit" component={EditUser} />
        <Route path="/users/:id/delete" component={DeleteUser} />
        <Route>
          <div className="container">404: No such page!</div>
        </Route>
      </Switch>
    </div>
  )
}

// ...existing code...

