import React from 'react'
import {Box, Button, CircularProgress, Container, TextField} from "material-ui-core"
import {connect} from 'react-redux'
import logo from '../assets/dairy-logo.png'
import withStyles from "material-ui-core/styles/withStyles"

const styles = theme => ({
    ...theme.styling
})

function Signin({classes}) {
    return (
        <Container maxWidth='xs'>
            <Box bgcolor='grey' textAlign='center' p='24px' mt='70px' boxShadow='2' borderRadius='15px'>
                <img src={logo} alt="logo" height='100px'/>
                <TextField label='Email' type='email' name='email' variant='outlined' fullWidth size='small'
                           id='email' margin='normal' color='secondary'/>
                <TextField label='Password' type='password' name='password' variant='outlined' fullWidth size='small'
                           id='password' margin='normal' color='secondary'/>
                <CircularProgress size={24} color='primary'/>
                <Button type='submit' variant='contained' color='primary' fullWidth className={classes.button}>
                    Signin
                </Button>
            </Box>
        </Container>
    )
}

const mapStateToProps = state => ({})

const mapActionsToProps = dispatch => ({})

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Signin))
