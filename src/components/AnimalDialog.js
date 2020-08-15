import React, {Fragment, useState} from 'react'
import {Dialog, DialogActions, DialogContent, Typography} from "material-ui-core"

function AnimalDialog({animal}) {

    const [isOpen, setIsOpen] = useState(false)

    const handleClose = () => {
        setIsOpen(false)
    }

    const {animalName, animalId} = animal

    return (
        <Fragment>
            <button className='btn btn-sm btn-outline-success btn-appearance' onClick={() => setIsOpen(true)}>
                View
            </button>
            <Dialog open={isOpen} onClose={handleClose} fullWidth>
                <DialogContent>
                    <Typography variant='h6' className='text-center'>Animal Details: {animalId}</Typography>
                    <h6>{animalName}</h6>
                </DialogContent>
                <DialogActions>

                </DialogActions>
            </Dialog>
        </Fragment>
    )
}

export default AnimalDialog
