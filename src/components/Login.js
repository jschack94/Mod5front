import React from 'react'
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router'
import { connect } from 'react-redux'
import { compose } from 'redux'
import * as actions from  '../actions'
import LoggedOutHeader from './LoggedOutHeader'
import Welcome from 'react-welcome-page'


import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  root: {
    width: 'auto',
    marginLeft: 130,
    marginRight: 130,
  },
  paper: {
    ...theme.mixins.gutters(),
    width: '50%',
    marginTop: 100,
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingTop: theme.spacing.unit * 4,
    paddingBottom: theme.spacing.unit * 4,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  dense: {
    marginTop: 19,
  },
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
})

class Login extends React.Component {

  state = {
    'email_address': '',
    'password': '',
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value,
    })
  }

  handleLoginSubmit = event => {
    event.preventDefault()
    this.props.logIn(this.state.email_address, this.state.password)
    this.setState({
      'email_address': '',
      'password': '',
    })
  }

  errorFlash = error => {
    alert(error)
    this.props.closeAlertError()
  }

  render() {
    const { classes, loggedIn, error, location } = this.props
    const { email_address, password } = this.state

    if (loggedIn) {
      return <Redirect to={location.state ? location.state.currentPage : "/dashboard"} />
    } else {
      return (
        <div className={classes.root}>
          {error ? this.errorFlash(error) : null}
          <LoggedOutHeader />
          <Paper className={classes.paper} elevation={1}>
            
          <Typography variant="headline" component="h3">
              Welcome Back to Bloom! Login to be reconnected with your mentors and mentees.
            </Typography>
            <form
              onSubmit={this.handleLoginSubmit}
              className={classes.container}
              noValidate
              autoComplete="off">
              <TextField
                id="email_address"
                label="Email Address"
                value={email_address}
                onChange={this.handleChange}
                className={classNames(classes.textField, classes.dense)}
                margin="dense" />
              <TextField
                id="password"
                label="Password"
                value={password}
                onChange={this.handleChange}
                className={classes.textField}
                type="password"
                autoComplete="current-password"
                margin="normal" />
              <Button
                type="submit"
                color="primary"
                className={classes.button}>
                Log In
              </Button>
            </form>
          </Paper>
          <p style={{ textAlign: 'center' }}>Don't have an account? <Link to="/signup" style={{ textDecoration: 'none'}}>Sign Up</Link></p>
          <Welcome
		loopDuration={1800}
		data={[
		{
		image: "https://seeklogo.com/images/B/blue-flower-design-logo-F4C2DC0C40-seeklogo.com.png",
		text: 'LOADING...',
		imageAnimation: 'bounce',
		textAnimation: 'flipInX',
		backgroundColor: '#daf0f2',
		textColor: '#002134'
		},
		{
		image: "https://seeklogo.com/images/B/blue-flower-design-logo-F4C2DC0C40-seeklogo.com.png",
    text: <strong>WELCOME TO BLOOM</strong>,
    backgroundColor: '#daf0f2'
}
]}

/> 


    </div>
      )
    }
  }
}




const mapStateToProps = ({ usersReducer: { loggedIn, error } }) => {
  return {
    loggedIn,
    error,
  }
}

export default compose(
  withStyles(styles),
  connect(mapStateToProps, actions)
)(Login)