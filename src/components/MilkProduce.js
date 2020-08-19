import React, {useState} from 'react'
import {connect} from 'react-redux'
import {Button, CircularProgress, TextField, Typography} from "material-ui-core"
import dayJs from "dayjs"
import {makeStyles} from "@material-ui/core/styles"
import {fetchMilkProduce} from "../api"

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        width: '100%',
    },
}))

function MilkProduce({produceData: {produce, loading, error}, fetchMilkProduce}) {
    const today = dayJs(new Date().toISOString()).format('YYYY-MM-DD')
    const [date, setDate] = useState(today)
    const classes = useStyles()

    const findTransactions = () => {
        if (date !== '' && date !== today) {
            fetchMilkProduce(dayJs(date).format('DD MMM YYYY'))
        }
    }

    const showLoader = (
        <div className="text-center">
            <CircularProgress size={50} style={{marginTop: 10}} color='primary'/>
        </div>
    )

    return (
        <div>
            <div className="row">
                <div className="col-sm-12 col-md-7 p-2">
                    <TextField id="date" label="Please Select a Day" type="date" value={produce.length > 0 ?
                        dayJs(produce[0]['date']).format('YYYY-MM-DD') : date}
                               variant='outlined' size='small' className={classes.textField} InputLabelProps={{
                        shrink: true,
                    }} onChange={e => setDate(e.target.value)}/>
                </div>
                <div className="col-sm-12 col-md-5 p-2">
                    <Button variant='outlined' color='primary' onClick={findTransactions}>
                        Search Reports
                    </Button>
                </div>
            </div>
            {loading ? showLoader : (
                error ? (
                    <p style={{color: 'red'}} className='p-4'>
                        Failed to load Reports. Refresh to retry
                    </p>
                ) : (
                    produce.length > 0 ? (
                        <table className='table bg-light mt-2'>
                            <thead>
                            <tr className='text-muted'>
                                <th>#</th>
                                <th>Animal ID</th>
                                <th>Animal Name</th>
                                <th>Morning Qty</th>
                                <th>Evening Qty</th>
                                <th>Remaining Qty</th>
                                <th>Time</th>
                            </tr>
                            </thead>
                            {produce.map((prod, index) => (
                                <tbody key={prod["produceId"]}>
                                <tr>
                                    <td>{index + 1}</td>
                                    <td>{prod['animalId']}</td>
                                    <td style={{textTransform: 'capitalize'}}>{prod['animalName']}</td>
                                    <td>{prod['mrgQty'] !== '' ? prod['mrgQty'] : '---'}</td>
                                    <td>{prod['evnQty'] !== '' ? prod['evnQty'] : '---'}</td>
                                    <td>{prod['remQty']}</td>
                                    <td>{prod['time']}</td>
                                </tr>
                                </tbody>
                            ))}
                        </table>
                    ) : (
                        <div className='text-center'>
                            <Typography variant='body2' style={{color: 'red'}}>
                                No Milk Produce found for <b>{dayJs(date).format('DD MMM YYYY')}</b>
                            </Typography>
                        </div>
                    )
                )
            )}
        </div>
    )
}

const mapStateToProps = state => ({
    produceData: state.produceData
})

const mapActionsToProps = dispatch => ({
    'fetchMilkProduce': (day) => dispatch(fetchMilkProduce(day))
})

export default connect(mapStateToProps, mapActionsToProps)(MilkProduce)
