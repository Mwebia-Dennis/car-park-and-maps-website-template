
import {createStyles, makeStyles} from '@mui/styles';

export const useStyles = makeStyles((theme) => createStyles({

    container: {
        width: '30%',
        marginLeft: "35%",        
        [theme.breakpoints.down('sm')]: {
            width: '100%',
            margin: '0'
        },
    }

}))