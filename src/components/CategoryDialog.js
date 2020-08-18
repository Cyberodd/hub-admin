import React, {Fragment, useState} from 'react'
import {Button, Dialog, DialogActions, DialogContent, Typography} from "material-ui-core"
import {removeCategory} from "../api"
import {connect} from 'react-redux'

function CategoryDialog({category, removeCategory}) {

    const [isOpen, setIsOpen] = useState(false)

    const handleClose = () => {
        setIsOpen(false)
    }

    const {categoryName, categoryId} = category

    const handleDelete = () => {
        removeCategory(categoryId)
        handleClose()
    }

    return (
        <Fragment>
            <Button variant='contained' color='secondary' size='small' onClick={() => setIsOpen(true)}>
                Delete
            </Button>
            <Dialog open={isOpen} onClose={handleClose} fullWidth maxWidth='xs'>
                <DialogContent>
                    <Typography variant='body2'>Your are about to delete a category with the
                        name <b>{categoryName}</b> from your category list. Are you sure you want to proceed?
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

const mapStateToProps = state => ({
    categoryData: state.categoryData
})

const mapActionsToProps = dispatch => ({
    removeCategory: (categoryId) => dispatch(removeCategory(categoryId))
})

export default connect(mapStateToProps, mapActionsToProps)(CategoryDialog)
