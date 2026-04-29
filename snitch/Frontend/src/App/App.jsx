import Register from '../features/auth/pages/Register';
import Login from '../features/auth/pages/Login';
import {RouterProvider} from "react-router"
import { routes } from './app.routes';

function App() {
  return <RouterProvider router={routes}/>;
}

export default App;
