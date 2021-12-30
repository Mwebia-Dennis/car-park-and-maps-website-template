
import {createStyles, makeStyles} from '@mui/styles';

export const useStyles = makeStyles((theme) => createStyles({

  container: {
    padding: '90px 0 0 50px',
    marginRight: '20px',
    [theme.breakpoints.down('sm')]: {
        padding: '50px 0 0 10px',
        marginRight: 0,
      },
  }, 
  

}))