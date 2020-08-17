import React, {Fragment, useState} from 'react'
import {Button, Dialog, DialogActions, DialogContent} from "material-ui-core"

function AdminDialog({admin}) {

    const [isOpen, setIsOpen] = useState(false)

    const handleClose = () => {
        setIsOpen(false)
    }

    const {name, email} = admin

    const handleDelete = () => {
        console.log('Deleting category with ID: ', name)
    }

    return (
        <Fragment>
            <button className='btn btn-sm btn-outline-info btn-appearance' onClick={() => setIsOpen(true)}
                    disabled={email === 'admin@admin.com'}>
                {email === 'admin@admin.com' ? 'Default' : 'Edit'}
            </button>
            <Dialog open={isOpen} onClose={handleClose} fullWidth maxWidth='xs'>
                <DialogContent>
                    <p>{name}</p>
                    <p>{email}</p>
                </DialogContent>
                <DialogActions>
                    <Button type='submit' variant='contained' color='secondary' size='small' onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button type='submit' variant='contained' color='primary' size='small' onClick={handleDelete}>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    )
}

export default AdminDialog
