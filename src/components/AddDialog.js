import React, {Fragment, useState} from 'react'
import {Button, Dialog, DialogContent, TextField, Typography} from "material-ui-core"

function AddDialog({isAdmin, isCategory}) {

    const [isOpen, setIsOpen] = useState(false)

    const handleClose = () => {
        setIsOpen(false)
    }

    const handleChange = event => {

    }

    const submitAdmin = e => {
        e.preventDefault()
    }

    const submitCategory = e => {
        e.preventDefault()
    }

    const renderAddCategory = (
        <div>
            <Typography variant='h6'>Add a new Category</Typography>
            <form onSubmit={submitCategory}>
                <TextField label='Category Name' type='text' name='name' variant='outlined' fullWidth size='small'
                           id='name' margin='normal' color='secondary' onChange={handleChange}/>
                <Button variant='outlined' size='small' color='primary' fullWidth className='mt-3 mb-3'>Submit</Button>
            </form>
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

export default AddDialog
