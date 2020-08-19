import React, {useState} from 'react'
import {makeStyles} from "@material-ui/core/styles"
import {Button, CircularProgress, TextField, Typography} from "material-ui-core"
import {connect} from 'react-redux'
import dayJs from 'dayjs'
import {fetchAnimalFromState, fetchTransactions} from "../api"
import AnimalDialog from "./AnimalDialog"

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

function Sales({salesData: {sales, loading, error}, animalData, fetchAnimalFromState, fetchTransactions}) {
    const today = dayJs(new Date().toISOString()).format('YYYY-MM-DD')

    const [date, setDate] = useState(today)
    const [saleObj, setSaleObj] = useState(null)
    const classes = useStyles()

    const findTransactions = () => {
        if (date !== '' && date !== today) {
            fetchTransactions(dayJs(date).format('DD MMM YYYY'))
        }
    }

    const handleView = (e, sale) => {
        setSaleObj(sale)
        fetchAnimalFromState(sale['animalId'])
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
                    <TextField id="date" label="Please Select a Day" type="date" value={sales.length > 0 ?
                        dayJs(sales[0]['date']).format('YYYY-MM-DD') : date}
                               variant='outlined' size='small' className={classes.textField} InputLabelProps={{
                        shrink: true,
                    }} onChange={e => setDate(e.target.value)}
                    />
                </div>
                <div className="col-sm-12 col-md-5 p-2">
                    <Button variant='outlined' color='primary' onClick={findTransactions}>
                        Search Transactions
                    </Button>
                </div>
            </div>
            <div className="row p-2">
                <div className="col-md-7 col-sm-12">
                    {loading ? showLoader : (
                        error ? (
                            <p style={{color: 'red'}} className='p-4'>
                                Failed to load Transactions. Refresh to retry
                            </p>
                        ) : (
                            sales.length > 0 ? (
                                <>
                                    <h5 className='text-center'>{sales[0]['date']} Transactions</h5>
                                    <table className='table'>
                                        <thead>
                                        <tr className='text-muted'>
                                            <th>#</th>
                                            <th>Day</th>
                                            <th>Type</th>
                                            <th>Quantity</th>
                                            <th>Action</th>
                                        </tr>
                                        </thead>
                                        {sales.map((sale, index) => (
                                            <tbody key={sale["transId"]}>
                                            <tr>
                                                <td>{index + 1}</td>
                                                <td>{sale["date"]}</td>
                                                <td>{sale["type"]}</td>
                                                <td>{sale["quantity"]} {sale["type"] === 'Milk Sale' ?
                                                    <span>litres</span> :
                                                    <span>Kgs</span>}</td>
                                                <td>
                                                    <Button variant='contained' color='primary' size='small'
                                                            onClick={e => handleView(e, sale)}>
                                                        View
                                                    </Button>
                                                </td>
                                            </tr>
                                            </tbody>
                                        ))}
                                    </table>
                                </>
                            ) : (
                                <div className='text-center'>
                                    <Typography variant='body2' style={{color: 'red'}}>
                                        No Transactions found for <b>{dayJs(date).format('DD MMM YYYY')}</b>
                                    </Typography>
                                </div>
                            )
                        )
                    )}
                </div>
                <div className="col-md-5 col-sm-12">
                    <h5>Transaction Info</h5>
                    <div className="card">
                        <div className="card-body">
                            {saleObj !== null ? (
                                <div>
                                    <Typography variant='body2'><b
                                        className='mr-2'>TransactionID:</b> {saleObj["transId"]}
                                    </Typography>
                                    <br/>
                                    <Typography variant='body2'><b className='mr-2'>Type:</b> {saleObj.type}
                                    </Typography>
                                    <br/>
                                    <Typography variant='body2'><b className='mr-2'>Quantity:</b>
                                        {saleObj["quantity"]} {saleObj["type"] === 'Milk Sale' ? <span>litres</span> :
                                            <span>Kgs</span>}
                                    </Typography>
                                    <br/>
                                    <Typography variant='body2'><b className='mr-2'>Date:</b> {saleObj["time"]}
                                    </Typography>
                                    <br/>
                                    <Typography variant='body2'><b className='mr-2'>Amount:</b> {saleObj["cash"]}
                                    </Typography>
                                    <br/>
                                    <AnimalDialog animal={animalData.animal}/>
                                </div>
                            ) : (
                                <p className='text-center'>No Sale Item Selected</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    salesData: state.salesData,
    animalData: state.animalData
})

const mapActionsToProps = dispatch => ({
    'fetchAnimalFromState': (animalId) => dispatch(fetchAnimalFromState(animalId)),
    fetchTransactions: (day) => dispatch(fetchTransactions(day))
})

export default connect(mapStateToProps, mapActionsToProps)(Sales)
