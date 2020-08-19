import React, {Fragment, useState} from 'react'
import {Button, CircularProgress, Dialog, DialogContent, TextField, Typography} from "material-ui-core"
import {connect} from 'react-redux'
import {addAdmin, addCategory, clearErrors} from "../api"

function AddDialog({isAdmin, isCategory, addCategory, addAdmin, clearErrors, categoryData: {catLoading, errors}, adminData}) {

    const [isOpen, setIsOpen] = useState(false)
    const [category, setCategory] = useState({name: ''})
    const [admin, setAdmin] = useState({name: '', email: '', phone: '', password: ''})

    const handleClose = () => {
        setIsOpen(false)
        clearErrors()
    }

    const errorMsg = errors && errors.name

    const handleChange = event => {
        if (isCategory !== undefined) {
            setCategory({...category, [event.target.name]: event.target.value})
        } else {
            setAdmin({...admin, [event.target.name]: event.target.value})
        }
    }

    const progress = (<CircularProgress size={25} style={{marginTop: 10}} color='primary'/>)

    const submitAdmin = e => {
        e.preventDefault()
        addAdmin(admin)
        setAdmin({name: '', email: '', phone: '', password: ''})
    }

    const submitCategory = e => {
        e.preventDefault()
        addCategory(category)
        setCategory({name: ''})
    }

    const renderAddCategory = (
        <div className='text-center'>
            <Typography variant='h6'>Add a new Category</Typography>
            <TextField label='Category Name' type='text' name='name' variant='outlined' fullWidth size='small' id='name'
                       margin='normal' color='secondary' onChange={handleChange} value={category.name} required
                       helperText={errorMsg} error={!!errorMsg}/>
            {catLoading && progress}
            <Button variant='contained' size='small' color='primary' fullWidth className='mt-3 mb-3'
                    onClick={submitCategory} disabled={catLoading}>
                Submit
            </Button>
        </div>
    )

    const renderAddAdminLayout = (
        <div className='text-center'>
            <Typography variant='h6'>Add an Admin</Typography>
            <TextField label='Name' type='text' name='name' variant='outlined' fullWidth size='small' id='name'
                       margin='normal' color='secondary' onChange={handleChange} required value={admin.name}
                       helperText={adminData.errors && adminData.errors.name}
                       error={adminData.errors && !!adminData.errors.name}/>
            <TextField label='Email' type='email' name='email' variant='outlined' fullWidth size='small' id='email'
                       margin='normal' color='secondary' onChange={handleChange} required value={admin.email}
                       helperText={adminData.errors && adminData.errors.email}
                       error={adminData.errors && !!adminData.errors.name}/>
            <TextField label='Phone' type='text' name='phone' variant='outlined' fullWidth size='small' id='phone'
                       margin='normal' color='secondary' onChange={handleChange} required value={admin.phone}
                       helperText={adminData.errors && adminData.errors.phone}
                       error={adminData.errors && !!adminData.errors.name}/>
            <TextField label='Password' type='password' name='password' variant='outlined' fullWidth size='small'
                       id='password' margin='normal' color='secondary' onChange={handleChange} required
                       helperText={adminData.errors && adminData.errors.password} value={admin.password}
                       error={adminData.errors && !!adminData.errors.name}/>
            {adminData.aLoading && progress}
            <Button variant='contained' size='small' color='primary' className='mt-3 mb-3' fullWidth
                    onClick={submitAdmin} disabled={adminData.aLoading}>
                Submit
            </Button>
        </div>
    )

    return (
        <Fragment>
            <Button variant='contained' size='small' color='primary' className='float-right'
                    onClick={() => setIsOpen(true)}>
                Add
            </Button>
            <Dialog open={isOpen} onClose={handleClose} fullWidth maxWidth='xs'>
                <DialogContent>
                    {isCategory !== undefined && renderAddCategory}
                    {isAdmin !== undefined && renderAddAdminLayout}
                </DialogContent>
            </Dialog>
        </Fragment>
    )
}

const mapStateToProps = state => ({
    categoryData: state.categoryData,
    adminData: state.adminData
})

const mapActionsToProps = dispatch => ({
    addCategory: (category) => dispatch(addCategory(category)),
    'addAdmin': (admin) => dispatch(addAdmin(admin)),
    clearErrors: () => dispatch(clearErrors())
})

export default connect(mapStateToProps, mapActionsToProps)(AddDialog)
