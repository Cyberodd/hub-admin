import React, {Fragment, useState} from 'react'
import {Button, Dialog, DialogActions, DialogContent, Typography} from "material-ui-core"

function CategoryDialog({category}) {

    const [isOpen, setIsOpen] = useState(false)

    const handleClose = () => {
        setIsOpen(false)
    }

    const {categoryName, categoryId} = category

    const handleDelete = () => {
        console.log('Deleting category with ID: ', categoryId)
    }

    return (
        <Fragment>
            <button className='btn btn-sm btn-outline-danger btn-appearance' onClick={() => setIsOpen(true)}>
                Delete
            </button>
            <Dialog open={isOpen} onClose={handleClose} fullWidth maxWidth='xs'>
                <DialogContent>
                    <Typography variant='body2'>Your are about to delete a category with the name {categoryName} from
                        your category list. Are you sure you want to proceed?
                    </Typography>
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

export default CategoryDialog
