import React, {useState} from 'react'
import {Box, Button, CircularProgress, Container, TextField, Typography} from "material-ui-core"
import {connect} from 'react-redux'
import logo from '../assets/dairy-icon.png'
import withStyles from "material-ui-core/styles/withStyles"
import {signIn} from "../api"

const styles = theme => ({
    ...theme.styling
})

function Signin({classes, signIn, history, userData: {loading, errors: {email, password, general}}}) {

    const [user, setUser] = useState({email: '', password: ''})

    const handleChange = e => {
        setUser({...user, [e.target.name]: e.target.value})
    }

    const handleSubmit = () => {
        signIn(user, history)
        setUser({email: '', password: ''})
    }

    return (
        <Container maxWidth='xs'>
            <Box bgcolor='grey' textAlign='center' p='24px' mt='70px' boxShadow='2' borderRadius='15px'>
                <img src={logo} alt="logo" height='100px'/>
                <Typography variant='h5'>FarmHub Dairy</Typography>
                <TextField label='Email' type='email' name='email' variant='outlined' fullWidth size='small'
                           id='email' margin='normal' color='secondary' onChange={handleChange}
                           helperText={email} error={!!email}/>
                <TextField label='Password' type='password' name='password' variant='outlined' fullWidth size='small'
                           id='password' margin='normal' color='secondary' onChange={handleChange}
                           helperText={password} error={password}/>
                {general && (
                    <Typography variant='body2' className={classes.customError} color='secondary'>
                        {general}
                    </Typography>)
                }
                {loading && <CircularProgress size={24} color='primary'/>}
                <Button type='submit' variant='contained' color='primary' fullWidth className={classes.button}
                        onClick={handleSubmit} disabled={loading}>
                    Signin
                </Button>
            </Box>
        </Container>
    )
}

const mapStateToProps = state => ({
    userData: state.userData
})

const mapActionsToProps = dispatch => ({
    signIn: (user, history) => dispatch(signIn(user, history)),
})

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Signin))
