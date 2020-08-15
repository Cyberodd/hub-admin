import React from 'react'
import {ListItemIcon} from "material-ui-core"
import {AssessmentOutlined, MonetizationOnOutlined, PeopleAltOutlined, PetsTwoTone} from "@material-ui/icons"
import {makeStyles} from "material-ui-core/styles"

const useStyles = makeStyles(theme => ({
    content: {
        padding: theme.spacing(2),
        marginTop: 5,
        width: '100%'
    }
}))

const homeItems = [
    {name: 'Animals', count: 200, icon: <PetsTwoTone/>, appearance: 'text-success'},
    {name: 'Reports', count: 10000, icon: <AssessmentOutlined/>, appearance: 'text-warning'},
    {name: 'Sales', count: 100, icon: <MonetizationOnOutlined/>, appearance: 'text-primary'},
    {name: 'Users', count: 1000, icon: <PeopleAltOutlined/>, appearance: 'text-danger'},
]

const admins = [
    {name: 'Evans Shango', email: 'evans@test.com', regDate: '20 June, 2020'},
    {name: 'John Doe', email: 'john@doe.com', regDate: '23 June, 2019'},
    {name: 'Jane Doe', email: 'jane@doe.com', regDate: '20 June, 2018'},
]

function Home() {

    const classes = useStyles()

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
                            <div className="row p-2 text-center">
                                <div className="col-md-8 col-sm-8">
                                    <h5>Admins</h5>
                                </div>
                                <div className="col-md-4 col-sm-4">
                                    <button className="btn btn-sm btn-success">
                                        Add Admin
                                    </button>
                                </div>
                            </div>
                            {admins.map((admin, index) => (
                                <div className='card p-2' key={admin.name}>
                                    <div className="row p-2">
                                        <div className="col-sm-12 col-md-5">{admin.name}</div>
                                        <div className="col-sm-12 col-md-4">{admin.email}</div>
                                        <button className="col-sm-12 col-md-2 btn btn-sm btn-outline-success mr-1">
                                            View
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="col-md-5 col-sm-12">
                            <h5>Charts</h5>
                            <p className='text-justify'>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, aliquid assumenda
                                blanditiis consequuntur cum deleniti dignissimos et harum iste magni natus nobis nulla
                                optio quas quis quisquam quod, rerum suscipit vel velit! Alias aspernatur eius enim id
                                itaque, labore natus nesciunt nihil, quam quis rem repellat voluptatum! Commodi debitis
                                eius et iste magnam nemo nulla, pariatur porro quibusdam rerum. Blanditiis consequuntur
                                dolorem doloremque error esse est excepturi expedita fuga fugit impedit ipsa itaque
                                laborum, libero nam necessitatibus neque officia placeat quam quasi quia repellat
                                repellendus sed tenetur ut, velit voluptate voluptates? Ab aut expedita ipsum laborum
                                modi obcaecati quibusdam ut vero? Debitis error eveniet nostrum quidem. Aperiam
                                asperiores atque ducimus id illum maxime minus obcaecati perferendis, quidem repudiandae
                                tempora ullam.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
