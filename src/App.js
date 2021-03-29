import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Login from './pages/Login';
import Registration from './pages/Registration';
import Dashboard from './pages/Dashboard';
import store from './store/store';
import { Provider } from 'react-redux'
import AddSubject from './components/AddSubject';
import AddExam from './components/AddExam';
import AddMarks from './components/AddMarks';
function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="pages d-flex flex-column">
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
			  <Link className="navbar-brand" to="/">Performa</Link>
            <ul class="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">About</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/users">Users</Link>
              </li>
            </ul>
          </nav>

          {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
          <Switch>          
            <Route path="/registration">
              <Registration />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/dashboard">
              <Dashboard />
            </Route>
            <Route path="/addSubject">
              <AddSubject></AddSubject>
            </Route>
            <Route path="/addExam">
              <AddExam></AddExam>
            </Route>
            <Route path="/addMarks">
              <AddMarks></AddMarks>
            </Route>
            <Route path="/">
              <Login />
            </Route>
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
