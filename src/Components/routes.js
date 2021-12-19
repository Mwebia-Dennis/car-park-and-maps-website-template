
import Home from '../Views/Home'
import PageNotFound from '../Views/PageNotFound'
import MainTheme from '../Themes/MainTheme'
import { Navigate } from 'react-router';

export const routes = ()=> [
    // A route object has the same properties as a <Route>
    // element. The `children` is just an array of child routes.
    {
      path: '/',
      element: <MainTheme />,
      children: [
        { path: '/', element: <Home /> },
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