import React, {Fragment, useEffect, useState} from 'react'
import {Button, Dialog, DialogActions, DialogContent, Typography} from "material-ui-core"
import {makeStyles} from "material-ui-core/styles"
import {connect} from 'react-redux'
import {fetchAnimalOwner} from "../api"

const useStyles = makeStyles({
    animalImg: {
        maxWidth: '100%',
        height: 120,
        objectFit: 'cover',
        borderRadius: '50%'
    },
})

function AnimalDialog({animal, fetchAnimalOwner, userData: {owner}}) {

    const {
        animalName, animalBreed, imageUrl, gender, category, location,
        availability, status, regDate, father, mother, userId
    } = animal

    useEffect(() => {
        fetchAnimalOwner(userId)
    }, [fetchAnimalOwner, userId])

    const classes = useStyles()
    const [isOpen, setIsOpen] = useState(false)

    const handleClose = () => {
        setIsOpen(false)
    }

    return (
        <Fragment>
            <Button variant='outlined' color='primary' size='small' onClick={() => setIsOpen(true)}>
                View Animal
            </Button>
            <Dialog open={isOpen} onClose={handleClose} fullWidth>
                <DialogContent>
                    <Typography variant='body1'><b>Animal Details</b></Typography>
                    <div>
                        <div className='text-center'>
                            <img src={imageUrl} alt="comment" className={classes.animalImg}/>
                        </div>
                        <div className="row p-3">
                            <div className="col-sm-2">
                                <p><b>Name:</b></p>
                                <p><b>Category:</b></p>
                                <p><b>Gender:</b></p>
                                <p><b>Location:</b></p>
                                <p><b>Availability:</b></p>
                            </div>
                            <div className="col-sm-3">
                                <p>{animalName}</p>
                                <p>{category}</p>
                                <p>{gender}</p>
                                <p>{location}</p>
                                <p>{availability}</p>
                            </div>
                            <div className="col-sm-3">
                                <p><b>Breed:</b></p>
                                <p><b>Father:</b></p>
                                <p><b>Mother:</b></p>
                                <p><b>Status:</b></p>
                                <p><b>Reg Date:</b></p>
                            </div>
                            <div className="col-sm-4">
                                <p>{animalBreed}</p>
                                <p style={{textTransform: 'capitalize'}}>{father !== '' ? father : 'Not found'}</p>
                                <p style={{textTransform: 'capitalize'}}>{mother !== '' ? mother : 'Not found'}</p>
                                <p>{status}</p>
                                <p>{regDate}</p>
                            </div>
                        </div>
                        <div className="text-center">
                            <p style={{textTransform: 'capitalize'}}>
                                <b>Owner:</b> {owner && owner.name !== undefined ? owner.name: 'Not found'}
                            </p>
                        </div>
                    </div>
                </DialogContent>
                <DialogActions>

                </DialogActions>
            </Dialog>
        </Fragment>
    )
}

const mapStateToProps = state => ({
    userData: state.userData
})

const mapActionsToProps = dispatch => ({
    fetchAnimalOwner: (userId) => dispatch(fetchAnimalOwner(userId))
})

export default connect(mapStateToProps, mapActionsToProps)(AnimalDialog)
