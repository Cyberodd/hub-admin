import React, {Fragment, useState} from 'react'
import {Button, CircularProgress, Dialog, DialogContent, TextField, Typography} from "material-ui-core"
import {connect} from 'react-redux'
import {addCategory} from "../api"

function AddDialog({isAdmin, isCategory, addCategory, categoryData: {catLoading, errors}}) {

    const [isOpen, setIsOpen] = useState(false)
    const [category, setCategory] = useState({name: ''})

    const handleClose = () => {
        setIsOpen(false)
    }

    const errorMsg = errors && errors.name

    const handleChange = event => {
        if (isCategory !== undefined) {
            setCategory({...category, [event.target.name]: event.target.value})
        }
    }

    const submitAdmin = e => {
        e.preventDefault()
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
            {catLoading && <CircularProgress size={25} style={{marginTop: 10}} color='primary'/>}
            <Button variant='outlined' size='small' color='secondary' fullWidth className='mt-3 mb-3'
                    onClick={submitCategory}>
                Submit
            </Button>
        </div>
    )

    const renderAddAdminLayout = (
        <div>
            <Typography variant='h6'>Add an Admin</Typography>
            <form onSubmit={submitAdmin}>
                <TextField label='Name' type='text' name='name' variant='outlined' fullWidth size='small'
                           id='name' margin='normal' color='secondary' onChange={handleChange}/>
                <TextField label='Email' type='email' name='email' variant='outlined' fullWidth size='small'
                           id='email' margin='normal' color='secondary' onChange={handleChange}/>
                <TextField label='Phone' type='text' name='phone' variant='outlined' fullWidth size='small'
                           id='phone' margin='normal' color='secondary' onChange={handleChange}/>
                <TextField label='Password' type='password' name='password' variant='outlined' fullWidth size='small'
                           id='password' margin='normal' color='secondary' onChange={handleChange}/>
                <Button variant='outlined' size='small' color='primary' className='mt-3 mb-3' fullWidth>Submit</Button>
            </form>
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
    categoryData: state.categoryData
})

const mapActionsToProps = dispatch => ({
    addCategory: (category) => dispatch(addCategory(category))
})

export default connect(mapStateToProps, mapActionsToProps)(AddDialog)
