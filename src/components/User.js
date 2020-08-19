import React, {useState} from 'react'
import {connect} from 'react-redux'
import {CircularProgress, Typography} from "material-ui-core"
import {searchUsers} from "../api"

function User({userData: {users, loading, error}, searchUsers, searchData}) {

    const [name, setName] = useState('')
    const [isSearch, setIsSearch] = useState(false)

    const handleSubmit = e => {
        e.preventDefault()
        if (name !== ''){
            setIsSearch(true)
            searchUsers(name.toLowerCase())
            setName('')
        } else {
            setIsSearch(false)
        }
    }

    const handleChange = e => {
        setName(e.target.value)
        if (name === '') {
            setIsSearch(false)
        }
    }

    const progressLoader = (<CircularProgress size={50} style={{marginTop: 10}} color='primary'/>)

    const renderData = users => (
        <table className='table bg-light mt-2'>
            <thead>
            <tr className='text-muted'>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Farm</th>
                <th>Registration Date</th>
            </tr>
            </thead>
            {users.map((user, index) => (
                <tbody key={user["userId"]}>
                <tr>
                    <td>{index + 1}</td>
                    <td style={{textTransform: 'capitalize'}}>{user["name"]}</td>
                    <td>{user["email"]}</td>
                    <td>{user["phone"]}</td>
                    {user['farmName'] !== '' ? (
                        <td>{user["farmName"]}</td>
                    ) : (
                        <td>Not found</td>
                    )}
                    <td>{user['regDate']}</td>
                </tr>
                </tbody>
            ))}
        </table>
    )

    const renderError = (<p style={{color: 'red'}} className='p-4'>Failed to load Users. Refresh to retry</p>)

    return (
        <div className='text-center'>
            <div className='row justify-content-center'>
                <div className='col-md-8'>
                    <form onSubmit={handleSubmit}>
                        <div className='input-group'>
                            <input type='text' className='form-control search-input custom-input'
                                   placeholder='Search users e.g John Doe' onChange={handleChange}/>
                            <button type='submit' className='btn btn-primary search-button custom-button'>
                                Search
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            {!isSearch ? loading ? progressLoader : (
                error !== '' ? (
                    renderError
                ) : (
                    users.length > 0 ? (
                        renderData(users)
                    ) : (
                        <Typography variant='body2'>No Users found</Typography>
                    )
                )
            ) : (
                searchData.loading ? progressLoader : (
                    error !== '' ? (
                        renderError
                    ) : (
                        searchData.users.length > 0 ? (
                            renderData(searchData.users)
                        ) : (
                            <p style={{color: 'red', margin: 20}}>No animal name matched your query</p>
                        )
                    )
                )
            )}
        </div>
    )
}

const mapStateToProps = state => ({
    userData: state.userData,
    searchData: state.searchData
})

const mapActionsToProps = dispatch => ({
    searchUsers: (name) => dispatch(searchUsers(name))
})

export default connect(mapStateToProps, mapActionsToProps)(User)
