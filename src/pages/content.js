import React from 'react'
import Home from "../components/Home"
import User from "../components/User"
import Animal from "../components/Animal"
import Farm from "../components/Farm"
import Report from "../components/Report"
import Sale from "../components/Sale"

function Content({match:{params}}) {
    const renderComponents = (() => {
        switch (params.item){
            case 'dashboard': return <Home/>
            case 'farms': return <Farm/>
            case 'animals': return <Animal/>
            case 'users': return <User/>
            case 'sales': return <Sale/>
            case 'reports': return <Report/>
            default: return <Home/>
        }
    })()
    return (
        <div>
            <h3 style={{textTransform: 'capitalize'}}>{params.item}</h3>
            {renderComponents}
        </div>
    )
}

export default Content
