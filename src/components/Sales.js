import React, {useState} from 'react'
import {makeStyles} from "@material-ui/core/styles"
import {Button, TextField, Typography} from "material-ui-core"
import {connect} from 'react-redux'

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: '100%',
    },
}))

function Sales({salesData: {sales, loading, error}}) {

    let today = new Date()
    const dd = String(today.getDate()).padStart(2, '0')
    const mm = String(today.getMonth() + 1).padStart(2, '0') //January is 0!
    const yyyy = today.getFullYear()

    today = yyyy + '-' + mm + '-' + dd

    const [selectedDate, setSelectedDate] = useState(today)
    const [sale, setSale] = useState(null)
    const classes = useStyles()

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value)
        console.log(event.target.value)
    }

    return (
        <div>
            <div className="row">
                <div className="col-sm-12 col-md-7 p-2">
                    <TextField id="date" label="Please Select a Day" type="date" value={selectedDate}
                               variant='outlined' size='small' className={classes.textField} InputLabelProps={{
                        shrink: true,
                    }} onChange={handleDateChange}
                    />
                </div>
                <div className="col-sm-12 col-md-5 p-2">
                    <Button variant='outlined' className='float-right' color='primary'>
                        All Transactions
                    </Button>
                </div>
            </div>
            <div className="row p-2">
                <div className="col-md-7 col-sm-12">
                    <h5>Today's Transactions</h5>
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
                                <td>{sale["quantity"]}</td>
                                <td>
                                    <button className='btn btn-sm btn-outline-success btn-appearance'
                                            onClick={() => setSale(sale)}>
                                        View
                                    </button>
                                </td>
                            </tr>
                            </tbody>
                        ))}
                    </table>
                </div>
                <div className="col-md-5 col-sm-12">
                    <h5>Transaction Info</h5>
                    <div className="card">
                        <div className="card-body">
                            {sale !== null ? (
                                <div>
                                    <Typography variant='body2'><b className='mr-2'>TransactionID:</b> {sale["transId"]}
                                    </Typography>
                                    <br/>
                                    <Typography variant='body2'><b className='mr-2'>Type:</b> {sale.type}</Typography>
                                    <br/>
                                    <Typography variant='body2'><b className='mr-2'>Quantity:</b> {sale["quantity"]}
                                        {sale["type"] === 'Milk Sale' ? <span>litres</span> : <span>Kgs</span>}
                                    </Typography>
                                    <br/>
                                    <Typography variant='body2'><b className='mr-2'>Date:</b> {sale["time"]}
                                    </Typography>
                                    <br/>
                                    <Typography variant='body2'><b className='mr-2'>Amount:</b> {sale["cash"]}
                                    </Typography>
                                    <br/>
                                    <Button variant='contained' color='primary' size='small'>View Animal</Button>
                                </div>
                            ) : (
                                <p className='text-center'>No Sale Selected</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    salesData: state.salesData
})

const mapActionsToProps = dispatch => ({})

export default connect(mapStateToProps, mapActionsToProps)(Sales)
