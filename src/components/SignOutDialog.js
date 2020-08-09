import React, {Fragment, useState} from 'react'
import {Button, Dialog, DialogActions, DialogContent, ListItem, ListItemIcon, ListItemText} from "material-ui-core"
import {ExitToAppOutlined} from "@material-ui/icons"

function SignOutDialog() {

    const [isOpen, setIsOpen] = useState(false)

    const handleClose = () => {
        setIsOpen(false)
    }
    return (
        <Fragment>
            <ListItem button className='drawer-container' onClick={() => setIsOpen(true)}>
                <ListItemIcon><ExitToAppOutlined/></ListItemIcon>
                <ListItemText primary='Sign Out' className='drawer-text'/>
            </ListItem>
            <Dialog open={isOpen} onClose={handleClose} fullWidth maxWidth='xs' >
                <DialogContent>
                    <p>Are you sure you want to Sign Out?</p>
                </DialogContent>
                <DialogActions>
                    <Button type='submit' variant='contained' color='secondary' size='small' onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button type='submit' variant='contained' color='primary' size='small'>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    )
}

export default SignOutDialog
