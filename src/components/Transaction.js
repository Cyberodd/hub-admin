import React, {useEffect, useState} from 'react'
import {makeStyles} from "@material-ui/core/styles"
import {Button, TextField, Typography} from "material-ui-core"
import {fetchTransactions} from "../api"
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

function Transaction({fetchTransactions, transactionData: {transactions, loading, error}}) {

    useEffect(() => {
        fetchTransactions()
    }, [fetchTransactions])

    let today = new Date()
    const dd = String(today.getDate()).padStart(2, '0')
    const mm = String(today.getMonth() + 1).padStart(2, '0') //January is 0!
    const yyyy = today.getFullYear()

    today = yyyy + '-' + mm + '-' + dd

    const [selectedDate, setSelectedDate] = useState(today)
    const [transaction, setTransaction] = useState(null)
    const classes = useStyles()

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value)
        console.log(event.target.value)
    }

    return (
        <div>
            <div className="col-sm-12 col-md-7 p-2">
                <TextField id="date" label="Please Select a Day" type="date" value={selectedDate}
                           variant='outlined' size='small' className={classes.textField} InputLabelProps={{
                    shrink: true,
                }} onChange={handleDateChange}
                />
            </div>
            <div className="row p-2">
                <div className="col-md-7 col-sm-12">
                    <h5>Today's Transactions</h5>
                    <table className='table bg-light text-center'>
                        <thead>
                        <tr className='text-muted'>
                            <th>Transaction ID</th>
                            <th>Type</th>
                            <th>Quantity</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        {transactions.map(transaction => (
                            <tbody key={transaction["transId"]}>
                            <tr>
                                <td>{transaction["transId"]}</td>
                                <td>{transaction["type"]}</td>
                                <td>{transaction["quantity"]}</td>
                                <td>
                                    <button className='btn btn-sm btn-outline-success btn-appearance'
                                            onClick={() => setTransaction(transaction)}>
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
                            {transaction !== null ? (
                                <div>
                                    <Typography variant='body2'><b>TransactionID:</b> {transaction["transId"]}</Typography>
                                    <br/>
                                    <Typography variant='body2'><b>Type:</b> {transaction.type}</Typography>
                                    <br/>
                                    <Typography variant='body2'><b>Quantity:</b> {transaction["quantity"]}
                                        {transaction["type"] === 'Milk Sale' ? <span>litres</span>: <span>Kgs</span>}
                                    </Typography>
                                    <br/>
                                    <Typography variant='body2'><b>Date:</b> {transaction["time"]}</Typography>
                                    <br/>
                                    <Typography variant='body2'><b>Amount:</b> {transaction["cash"]}</Typography>
                                    <br/>
                                    <Button variant='contained' color='primary' size='small'>View Animal</Button>
                                </div>
                            ) : (
                                <p className='text-center'>No Transaction Selected</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    transactionData: state.transactionData
})

const mapActionsToProps = dispatch => ({
    fetchTransactions: () => dispatch(fetchTransactions())
})

export default connect(mapStateToProps, mapActionsToProps)(Transaction)
