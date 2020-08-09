import React from 'react'
import {Route} from 'react-router-dom'
import {makeStyles} from "material-ui-core/styles"
import {AppBar, CssBaseline, Divider, Drawer, ListItem, ListItemIcon, ListItemText, Toolbar} from "material-ui-core"
import {
    MonetizationOnOutlined, AssessmentOutlined, PeopleAltOutlined, PetsOutlined, HomeOutlined, CategoryOutlined,
} from '@material-ui/icons'
import logo from '../assets/dairy-logo.png'
import {Link} from "react-router-dom"
import Content from "./content"
import SignOutDialog from "../components/SignOutDialog"

const drawerItems = [
    {name: 'Dashboard', icon: <HomeOutlined/>, path: ''},
    {name: 'Farms', icon: <CategoryOutlined/>, path: 'farms'},
    {name: 'Animals', icon: <PetsOutlined/>, path: 'animals'},
    {name: 'Users', icon: <PeopleAltOutlined/>, path: 'users'},
    {name: 'Sales', icon: <MonetizationOnOutlined/>, path: 'sales'},
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
        marginTop: 40
    },
}))

function Dashboard() {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <CssBaseline/>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <img src={logo} alt="logo" height='50px'/>
                </Toolbar>
            </AppBar>
            <Drawer className={classes.drawer} variant='permanent' classes={{paper: classes.drawerPaper,}}>
                <Toolbar/>
                <br/>
                <div className={classes.drawerContainer}>
                    {drawerItems.map(item => (
                        <div key={item.name} className='drawer-item'>
                            <Link to={`/${item.path}`}>
                                <ListItem button className='drawer-container'>
                                    <ListItemIcon>
                                        {item.icon}
                                    </ListItemIcon>
                                    <ListItemText primary={item.name} className='drawer-text'/>
                                </ListItem>
                            </Link>
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

export default Dashboard
