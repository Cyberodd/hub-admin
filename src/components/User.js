import React from 'react'
import {connect} from 'react-redux'
import {CircularProgress, Typography} from "material-ui-core"

function User({userData: {users, loading, error}}) {

    const handleSubmit = () => {

    }

    return (
        <div className='text-center'>
            <div className='row justify-content-center'>
                <div className='col-md-8'>
                    <form onSubmit={handleSubmit}>
                        <div className='input-group'>
                            <input type='text' className='form-control search-input custom-input'
                                   placeholder='Search users e.g John'/>
                            <button type='button' className='btn btn-primary search-button custom-button'>
                                Search
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            {loading ? <CircularProgress size={50} style={{marginTop: 10}} color='primary'/> : (
                error !== '' ? (
                    <p style={{color: 'red'}} className='p-4'>
                        Failed to load Users. Refresh to retry
                    </p>
                ) : (
                    users.length > 0 ? (
                        <table className='table bg-light text-center mt-2'>
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
                                    <td>{user["name"]}</td>
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
                    ) : (
                        <Typography variant='body2'>No Users found</Typography>
                    )
                )
            )}
        </div>
    )
}

const mapStateToProps = state => ({
    userData: state.userData
})

export default connect(mapStateToProps)(User)
