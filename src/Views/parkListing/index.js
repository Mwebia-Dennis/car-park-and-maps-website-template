import React, {useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useDispatch,useSelector } from 'react-redux';
import { deleteCarPark, getAllCarParks } from '../../Store/reducers/carPark/carPark.actions';
import { Button, CircularProgress, Grid } from '@mui/material';
import { getTableHeaders, getAllFields } from '../../util/Constants';
import { styled } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useStyles } from './style';


export default function ParkListing() {

    const classes = useStyles()
    const [sort, setSort] = useState("CREATED_AT")
    const [limit, setLimit] = useState(10)
    const [page, setPage] = useState(1)
    const dispatch = useDispatch()
    const carParkState = useSelector((state) => state.carParkReducer)  
    const authState = useSelector((state) => state.authReducer)  
    React.useEffect(() => {
        
        dispatch(getAllCarParks(sort, page, limit))
    }, [sort, page, limit])


    const handleSortChange = (e)=>{
        setSort(e.target.value)
    }
    const handleLimitChange = (e)=>{
        setLimit(e.target.value)
    }
    const handlePageChange = (e, value)=>{
        setPage(value)
    }

    const handleDelete = (id)=>{
        if("id" in authState.data) {
            dispatch(deleteCarPark(authState.data.id, id))
        }
    }

    const style= {
        width: '96%',
        
    }

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: theme.palette.common.black,
          color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
          fontSize: 14,
        },
      }));
      
      const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
          backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
          border: 0,
        },
      }));


    return (

        <div>
            {
                carParkState.loading?<CircularProgress color="secondary" style={{margin: 10}} />
                :
                (
                <TableContainer  style={style} >

                    
                    <div className={classes.container}>

                        <div style={{padding: '20px 0'}}>
                            <Grid container>
                                <Grid item md={9}></Grid>
                                <Grid item md={3}>

                                    <FormControl style={{marginRight: '20px',marginBottom: '20px',width: '140px'}}>
                                        <InputLabel id="demo-simple-select-label">Filtrele</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={sort}
                                            label="Age"
                                            onChange={handleSortChange}
                                            >
                                                {
                                                    getAllFields().map(item=><MenuItem value={item.name} key={item.name}>{item.label.toLowerCase()}</MenuItem>)
                                                }
                                        </Select>
                                    </FormControl>
                                    
                                    <FormControl style={{  width: '140px'}}>
                                        <InputLabel id="limit">Gosterim araligi</InputLabel>
                                        <Select
                                            labelId="limit"
                                            id="limit"
                                            value={limit}
                                            label="Age"
                                            onChange={handleLimitChange}
                                            >
                                                {
                                                    [10, 50, 100].map(item=><MenuItem value={item} key={item}>{item}</MenuItem>)
                                                }
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </div>
                                
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    {
                                        getTableHeaders().map(item=>
                                            <StyledTableCell key={item}>{item.toLowerCase()}</StyledTableCell>)
                                    }
                                    
                                    <StyledTableCell>{"eylem".toLowerCase()}</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {("data" in carParkState.data)?carParkState.data.data.map((row) => (
                                <StyledTableRow 
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.park_name}
                                    </TableCell>
                                    <TableCell align="right">{row.location_name}</TableCell>
                                    <TableCell align="right">{row.park_type_id}</TableCell>
                                    <TableCell align="right">{row.park_type_desc}</TableCell>
                                    <TableCell align="right">{row.capacity_of_park}</TableCell>
                                    <TableCell align="right">{row.working_time}</TableCell>
                                    <TableCell align="right">{row.county_name}</TableCell>
                                    <TableCell align="right">{row.longitude}</TableCell>
                                    <TableCell align="right">{row.latitude}</TableCell>
                                    <TableCell align="right">{row.added_by.name}</TableCell>
                                    <TableCell align="right">{new Date(row.created_at).toLocaleString("tr-TR", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</TableCell>
                                    <TableCell align="right">{new Date(row.updated_at).toLocaleString("tr-TR", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</TableCell>
                                    <TableCell align="right"><Button color="secondary" onClick={()=>handleDelete(row.id)}>silmek</Button>  </TableCell>
                                </StyledTableRow >
                            )):<div>0 results found</div>}
                            </TableBody>
                        </Table>
                    </div>

                    

                </TableContainer>)
            }

            
            <Grid container style={{marginBottom: 20, marginTop: 20}}>
                <Grid item md={4}></Grid>
                <Grid md={6}>
                    <Stack spacing={2}>
                        <Pagination count={10} page={page} onChange={handlePageChange} color="primary" />
                    </Stack>
                </Grid>
            </Grid>
        </div>
        
    );
}
