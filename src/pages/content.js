import React from 'react'
import Home from "../components/Home"
import User from "../components/User"
import Animal from "../components/Animal"
import Report from "../components/Report"
import Transactions from "../components/Sales"
import {Redirect} from "react-router-dom"
import {connect} from 'react-redux'
import MilkProduce from "../components/MilkProduce"

function Content({match:{params}, authenticated}) {

    if (!authenticated) return <Redirect to='/'/>

    const renderComponents = (() => {
        switch (params.item){
            case 'dashboard': return <Home/>
            case 'milk-produce': return <MilkProduce/>
            case 'animals': return <Animal/>
            case 'users': return <User/>
            case 'sales': return <Transactions/>
            case 'reports': return <Report/>
            default: return <Home/>
        }
    })()
    return (
        <div>
            {renderComponents}
        </div>
    )
}

const mapStateToProps = state => ({
    authenticated: state.authData.authenticated
})

export default connect(mapStateToProps)(Content)
