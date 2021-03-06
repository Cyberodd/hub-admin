import React, {useState} from 'react'
import {connect} from 'react-redux'
import {Button, CircularProgress, TextField, Typography} from "material-ui-core"
import dayJs from "dayjs"
import {makeStyles} from "@material-ui/core/styles"
import {fetchReports} from "../api"

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

function Report({reportData: {reports, loading, error}, fetchReports}) {
    const today = dayJs(new Date().toISOString()).format('YYYY-MM-DD')
    const [date, setDate] = useState(today)
    const classes = useStyles()

    const findTransactions = () => {
        if (date !== '' && date !== today) {
            fetchReports(dayJs(date).format('DD MMM YYYY'))
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
                    <TextField id="date" label="Please Select a Day" type="date" value={reports.length > 0 ?
                        dayJs(reports[0]['date']).format('YYYY-MM-DD') : date}
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
                    reports.length > 0 ? (
                        <table className='table bg-light mt-2'>
                            <thead>
                            <tr className='text-muted'>
                                <th>#</th>
                                <th>Report ID</th>
                                <th>Total Sales</th>
                                <th>Milk Sales</th>
                                <th>Animal Sales</th>
                                <th>Total Cash</th>
                                <th>Date</th>
                            </tr>
                            </thead>
                            {reports.map((report, index) => (
                                <tbody key={report["reportId"]}>
                                <tr>
                                    <td>{index + 1}</td>
                                    <td>{report['reportId']}</td>
                                    <td>{report['totalTransactions']}</td>
                                    <td>{report['milkSales']}</td>
                                    <td>{report['animalSales']}</td>
                                    <td>{report['totalCash']}</td>
                                    <td>{report['date']}</td>
                                </tr>
                                </tbody>
                            ))}
                        </table>
                    ) : (
                        <div className='text-center'>
                            <Typography variant='body2' style={{color: 'red'}}>
                                No Reports found for <b>{dayJs(date).format('DD MMM YYYY')}</b>
                            </Typography>
                        </div>
                    )
                )
            )}
        </div>
    )
}

const mapStateToProps = state => ({
    reportData: state.reportData
})

const mapActionsToProps = dispatch => ({
    fetchReports: (day) => dispatch(fetchReports(day))
})

export default connect(mapStateToProps, mapActionsToProps)(Report)
