import { createBrowserRouter } from 'react-router-dom';
import HomePage from './presentation/pages/HomePage';
import Login from './presentation/components/UserDetails/Login';
import Signup from './presentation/components/UserDetails/Signup';
import MainPage from './presentation/pages/MainPage';

const router = createBrowserRouter([
  { path: '/', element: <HomePage /> },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <Signup /> },
  { path: '/dashboard', element: <MainPage /> }
]);

export default router;
