import React, {useState} from 'react'
import {makeStyles} from "@material-ui/core/styles"
import {TextField} from "material-ui-core"

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

const transactions = [
    {type: 'Milk Sale', time: '04 Aug 2020 14:05', cash: '50.00', quantity: 1, transactionId: 'MfVHW9ldttS5BSkB3vNK'},
    {
        type: 'Animal Sale',
        time: '05 Aug 2020 14:05',
        cash: '100.00',
        quantity: 2,
        transactionId: 'ah8rptfusdWQ8R2BoGz4'
    },
    {type: 'Milk Sale', time: '06 Aug 2020 14:05', cash: '150.00', quantity: 3, transactionId: 'uibXH4vsMnCvwh2kx1Po'},
]


function Transaction() {
    let today = new Date()
    const dd = String(today.getDate()).padStart(2, '0')
    const mm = String(today.getMonth() + 1).padStart(2, '0') //January is 0!
    const yyyy = today.getFullYear()

    today = yyyy + '-' + mm + '-' + dd

    const [selectedDate, setSelectedDate] = useState(today)
    const [transId, setTransId] = useState('')
    const classes = useStyles()

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value)
        console.log(event.target.value)
    }

    return (
        <div>
            <div className="col-sm-12 col-md-4 p-2">
                <TextField id="date" label="Please Select a Day" type="date" value={selectedDate}
                           variant='outlined' size='small' className={classes.textField} InputLabelProps={{
                    shrink: true,
                }} onChange={handleDateChange}
                />
            </div>
            <div className="row p-2">
                <div className="col-sm-12 col-md-7">
                    <h5>Today's Transactions</h5>
                    <table className='table bg-light'>
                        <thead>
                        <tr className='text-muted'>
                            <th>Transaction ID</th>
                            <th>Type</th>
                            <th>Quantity</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        {transactions.map(transaction => (
                            <tbody key={transaction.transactionId}>
                            <tr>
                                <td>{transaction.transactionId}</td>
                                <td>{transaction.type}</td>
                                <td>{transaction.quantity}</td>
                                <td>
                                    <button className='btn btn-sm btn-outline-success btn-appearance'
                                            onClick={() => setTransId(transaction.transactionId)}>
                                        View
                                    </button>
                                </td>
                            </tr>
                            </tbody>
                        ))}
                    </table>
                </div>
                <div className="col-sm-12 col-md-5">
                    <h5>Transaction Info</h5>
                    <div className="card">
                        <div className="card-body">
                            {transId !== '' ? (
                                <div className='text-center'>
                                    <p>Fetching info for transaction with id:</p>
                                    <p>{transId}</p>
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

export default Transaction
