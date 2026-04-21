import Register from '../features/auth/pages/Register';
import Login from '../features/auth/pages/Login';
import {RouterProvider} from "react-router"
import { routes } from './app.routes';

function App() {
  // const path = window.location.pathname;

  // if (path === '/login') {
  //   return <Login />;
  // }

  // return <Register />;
  return <RouterProvider router={routes}/>;
}

export default App;
