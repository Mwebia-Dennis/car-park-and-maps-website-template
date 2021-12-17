import {routes} from './Components/routes'
import { useRoutes } from 'react-router-dom'
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();
function App() {
  
  const element = useRoutes(routes())
  return <ThemeProvider theme={theme}>{element}</ThemeProvider>
}

export default App;
