import React, {Fragment, useState} from 'react'
import {Button, Dialog, DialogContent, TextField} from "material-ui-core"
import {connect} from 'react-redux'
import {removeAdmin, updateAdmin} from "../api"

function AdminDialog({admin, removeAdmin, updateAdmin, adminData, authData}) {

    const [isOpen, setIsOpen] = useState(false)
    const [role, setRole] = useState(admin.role)
    const {name, email, phone, regDate} = admin

    const handleClose = () => {
        setIsOpen(false)
    }

    const handleDelete = e => {
        e.preventDefault()
        removeAdmin(admin['userId'])
        handleClose()
    }

    const handleEdit = e => {
        e.preventDefault()
        if (role !== admin.role) {
            const updatedAdmin = {role}
            updateAdmin(admin['userId'], updatedAdmin)
            handleClose()
        }
    }

    return (
        <Fragment>
            <Button variant='contained' color='primary' size='small' onClick={() => setIsOpen(true)}
                    disabled={email === 'admin@admin.com' || email === authData.user} style={{width: '80px'}}>
                {email === 'admin@admin.com' ? 'Default' : 'Edit'}
            </Button>
            <Dialog open={isOpen} onClose={handleClose} fullWidth maxWidth='xs'>
                <DialogContent>
                    <h6>{admin.name} details</h6>
                    <TextField label='name' type='text' name='name' variant='outlined' fullWidth size='small'
                               id='name' margin='normal' color='secondary' value={name} disabled/>
                    <TextField label='email' type='email' name='email' variant='outlined' fullWidth size='small'
                               id='email' margin='normal' color='secondary' value={email} disabled/>
                    <TextField label='Phone' type='text' name='phone' variant='outlined' fullWidth size='small'
                               id='phone' margin='normal' color='secondary' value={phone} disabled/>
                    <TextField label='Reg Date' type='text' name='regDate' variant='outlined' fullWidth size='small'
                               id='regDate' margin='normal' color='secondary' value={regDate} disabled/>
                    <select name="role" className="form-control mt-3" onChange={e => setRole(e.target.value)}
                            value={role} id='name'>
                        <option value='user'>user</option>
                        <option value='admin'>admin</option>
                    </select>
                    <div className="row py-4">
                        <div className="col-6">
                            <Button type='submit' variant='contained' color='secondary' size='small'
                                    onClick={handleDelete} disabled={adminData.aLoading}>
                                Delete User
                            </Button>
                        </div>
                        <div className="col-6">
                            <Button type='submit' variant='contained' color='primary' size='small'
                                    className='float-right' onClick={handleEdit} disabled={adminData.aLoading}>
                                Update User
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </Fragment>
    )
}

const mapStateToProps = state => ({
    adminData: state.adminData,
    authData: state.authData
})

const mapActionsToProps = dispatch => ({
    removeAdmin: (adminId) => dispatch(removeAdmin(adminId)),
    updateAdmin: (adminId, admin) => dispatch(updateAdmin(adminId, admin))
})

export default connect(mapStateToProps, mapActionsToProps)(AdminDialog)
