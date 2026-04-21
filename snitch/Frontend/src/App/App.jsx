import Register from '../features/auth/pages/Register';
import Login from '../features/auth/pages/Login';

function App() {
  const path = window.location.pathname;

  if (path === '/login') {
    return <Login />;
  }

  return <Register />;
}

export default App;
