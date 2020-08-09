import React from 'react'
import Home from "../components/Home"
import User from "../components/User"
import Animal from "../components/Animal"
import Farm from "../components/Farm"
import Report from "../components/Report"
import Transactions from "../components/Transaction"

function Content({match:{params}}) {
    const renderComponents = (() => {
        switch (params.item){
            case 'dashboard': return <Home/>
            case 'farms': return <Farm/>
            case 'animals': return <Animal/>
            case 'users': return <User/>
            case 'transactions': return <Transactions/>
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

export default Content
