
import Home from '../Views/Home'
import PageNotFound from '../Views/PageNotFound'
import MainTheme from '../Themes/MainTheme'
import AuthTheme from '../Themes/AuthTheme'
import NewParking from '../Views/NewParking';
import Login from '../Views/Login';
import SignUp from '../Views/SignUp';
import { Navigate } from 'react-router';
import ParkListing from '../Views/parkListing';

export const routes = (isLoggedIn)=> [
    // A route object has the same properties as a <Route>
    // element. The `children` is just an array of child routes.
    {
      path: '/',
      element: isLoggedIn?<MainTheme />:<Navigate to="/auth/login" replace />,
      children: [
        { path: '/', element: <Home /> },
        { path: '/home', element: <Home /> },
        { path: '/new-parking', element: <NewParking /> },
        { path: '/park-listing', element: <ParkListing /> },
        { path: '*', element: <Navigate to="/404" replace /> }
      ]
    },
    {
      path: '/auth',
      element: <AuthTheme />,
      children: [
        { path: '/auth/login', element: <Login /> },
        { path: '/auth/signup', element: <SignUp /> },
        { path: '*', element: <Navigate to="/404" replace /> }
      ]
    },
    {
        path: '404',
        element : <PageNotFound />,
        children: [ 
            { path: '*', element: <Navigate to="/404" replace /> },
        ]
    },
    { path: '*', element: <Navigate to="404" replace /> },
  ]