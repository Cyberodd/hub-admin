import React, {useEffect} from 'react'
import {NavLink, Route} from 'react-router-dom'
import {makeStyles} from "material-ui-core/styles"
import dayJs from 'dayjs'
import {
    AppBar, CssBaseline, Divider, Drawer, ListItem, ListItemIcon, ListItemText, Toolbar, Typography
} from "material-ui-core"
import {
    MonetizationOnOutlined, AssessmentOutlined, PeopleAltOutlined, PetsOutlined, CategoryOutlined, DashboardOutlined,
} from '@material-ui/icons'
import logo from '../assets/dairy-icon.png'
import Content from "./content"
import SignOutDialog from "../components/SignOutDialog"
import {connect} from 'react-redux'
import {fetchAdmins, fetchAnimals, fetchCategories, fetchTransactions, fetchUsers} from "../api"

const drawerItems = [
    {name: 'Dashboard', icon: <DashboardOutlined/>, path: 'dashboard'},
    {name: 'Farms', icon: <CategoryOutlined/>, path: 'farms'},
    {name: 'Animals', icon: <PetsOutlined/>, path: 'animals'},
    {name: 'Users', icon: <PeopleAltOutlined/>, path: 'users'},
    {name: 'Transactions', icon: <MonetizationOnOutlined/>, path: 'transactions'},
    {name: 'Reports', icon: <AssessmentOutlined/>, path: 'reports'},
]

const drawerWidth = 240

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
        background: '#424242',
    },
    drawerContainer: {
        overflow: 'auto',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        marginTop: 50
    },
}))

function Dashboard({fetchCategories, fetchAdmins, fetchUsers, fetchAnimals, fetchTransactions}) {

    const classes = useStyles()

    console.log(dayJs(new Date().toISOString()).format('D MMM YYYY'))

    useEffect(() => {
        fetchCategories()
        fetchAdmins()
        fetchUsers()
        fetchAnimals()
        fetchTransactions()
    }, [fetchCategories, fetchAdmins, fetchUsers, fetchAnimals, fetchTransactions])

    return (
        <div className={classes.root}>
            <CssBaseline/>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <img src={logo} alt="logo" height='50px' style={{marginRight: 5}}/>
                    <Typography variant='body1'>FarmHub Dairy</Typography>
                </Toolbar>
            </AppBar>
            <Drawer className={classes.drawer} variant='permanent' classes={{paper: classes.drawerPaper,}}>
                <Toolbar/>
                <br/>
                <div className={classes.drawerContainer}>
                    {drawerItems.map(item => (
                        <div key={item.name} className='drawer-item'>
                            <NavLink to={`/${item.path}`} activeClassName="active" exact={true}>
                                <ListItem button className='drawer-container'>
                                    <ListItemIcon>
                                        {item.icon}
                                    </ListItemIcon>
                                    <ListItemText primary={item.name} className='drawer-text'/>
                                </ListItem>
                            </NavLink>
                        </div>
                    ))}
                    <Divider style={{backgroundColor: '#ffffff', marginTop: 10}}/>
                    <SignOutDialog/>
                </div>
            </Drawer>
            <main className={classes.content}>
                <Route path={`/:item`} component={Content}/>
            </main>
        </div>
    )
}

const mapStateToProps = state => ({
    categoryData: state.categoryData,
    transactionData: state.transactionData
})

const mapActionsToProps = dispatch => ({
    fetchCategories: () => dispatch(fetchCategories()),
    fetchAdmins: () => dispatch(fetchAdmins()),
    fetchUsers: () => dispatch(fetchUsers()),
    fetchAnimals: () => dispatch(fetchAnimals()),
    fetchTransactions: () => dispatch(fetchTransactions())
})

export default connect(mapStateToProps, mapActionsToProps)(Dashboard)
