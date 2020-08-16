import React from 'react'
import {CircularProgress, ListItemIcon, Typography} from "material-ui-core"
import {AssessmentOutlined, MonetizationOnOutlined, PeopleAltOutlined, PetsTwoTone} from "@material-ui/icons"
import {makeStyles} from "material-ui-core/styles"
import {connect} from 'react-redux'
import CategoryDialog from "./CategoryDialog"
import AdminDialog from "./AdminDialog"
import AddDialog from "./AddDialog"

const useStyles = makeStyles(theme => ({
    content: {
        padding: theme.spacing(2),
        marginTop: 5,
        width: '100%'
    }
}))

function Home({categoryData, adminData, userData, animalData, salesData}) {

    const homeItems = [
        {name: 'Animals', count: animalData.animals.length, icon: <PetsTwoTone/>, appearance: 'text-success'},
        {name: 'Reports', count: 10000, icon: <AssessmentOutlined/>, appearance: 'text-warning'},
        {name: 'Sales', count: salesData.sales.length, icon: <MonetizationOnOutlined/>, appearance: 'text-primary'},
        {name: 'Users', count: userData.users.length, icon: <PeopleAltOutlined/>, appearance: 'text-danger'},
    ]

    const classes = useStyles()

    const showLoader = (
        <div className="text-center">
            <CircularProgress size={50} style={{marginTop: 10}} color='primary'/>
        </div>
    )

    const renderAdmins = (
        adminData.loading ? (
            showLoader
        ) : (
            adminData.error ? (
                <p style={{color: 'red'}} className='p-4'>
                    Failed to load Categories. Refresh to retry
                </p>
            ) :(
                <table className='table'>
                    <thead>
                    <tr className='text-muted'>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    {adminData.admins && adminData.admins
                        .map((admin, index) => (
                            <tbody key={admin["userId"]}>
                            <tr>
                                <td>{index + 1}</td>
                                <td>{admin["name"]}</td>
                                <td>{admin["email"]}</td>
                                <td>
                                    <AdminDialog admin={admin}/>
                                </td>
                            </tr>
                            </tbody>
                        ))}
                </table>
            )
        )
    )

    return (
        <div>
            <div className="row custom-home">
                {homeItems.map(item => (
                    <div className="col-sm-6 col-md-6 col-lg-3 p-2" key={item.name}>
                        <div className="card card-common">
                            <div className="card-body">
                                <div className="d-flex justify-content-between">
                                    <ListItemIcon className={item.appearance}>{item.icon}</ListItemIcon>
                                    <div className='text-right text-secondary'>
                                        <h6><b>{item.name}</b></h6>
                                        <h5>{item.count}</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                <div className={classes.content}>
                    <div className="row">
                        <div className="col-md-7 col-sm-12">
                            <div className="row p-2">
                                <div className="col-md-6 col-sm-6">
                                    <h6><b>Admins</b></h6>
                                </div>
                                <div className="col-md-6 col-sm-6">
                                    <AddDialog isAdmin={'admin'}/>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-body p-0">
                                    {renderAdmins}
                                </div>
                            </div>
                        </div>
                        <div className="col-md-5 col-sm-12">
                            <div className="row p-2">
                                <div className="col-md-6 col-sm-6">
                                    <h6><b>Categories</b></h6>
                                </div>
                                <div className="col-md-6 col-sm-6">
                                    <AddDialog isCategory={'category'}/>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-body p-0">
                                    {categoryData.loading ? (
                                        showLoader
                                    ) : (
                                        categoryData.error !== '' ? (
                                            <p style={{color: 'red'}} className='p-4'>
                                                Failed to load Categories. Refresh to retry
                                            </p>
                                        ): (
                                            categoryData.categories.length > 0 ? (
                                                <table className='table'>
                                                    <thead>
                                                    <tr className='text-muted'>
                                                        <th>#</th>
                                                        <th>Category Name</th>
                                                        <th>Actions</th>
                                                    </tr>
                                                    </thead>
                                                    {categoryData.categories && categoryData.categories
                                                        .map((category, index) => (
                                                            <tbody key={category["categoryId"]}>
                                                            <tr>
                                                                <td>{index + 1}</td>
                                                                <td>{category["categoryName"]}</td>
                                                                <td>
                                                                    <CategoryDialog category={category}/>
                                                                </td>
                                                            </tr>
                                                            </tbody>
                                                        ))}
                                                </table>
                                            ) : (
                                                <Typography variant='body2'>No Categories found</Typography>
                                            )
                                        )
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    categoryData: state.categoryData,
    adminData: state.adminData,
    userData: state.userData,
    animalData: state.animalData,
    salesData: state.salesData
})

export default connect(mapStateToProps)(Home)
