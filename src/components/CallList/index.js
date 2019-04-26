import React, { useEffect, useState } from 'react'
import { Typography, Paper, CircularProgress, Button } from '@material-ui/core'
import withStyles from '@material-ui/core/styles/withStyles'
import firebase from '../firebase'
import { withRouter } from 'react-router-dom'

const styles = theme => ({
	main: {
		width: 'auto',
		display: 'block', // Fix IE 11 issue.
		marginLeft: theme.spacing.unit * 3,
		marginRight: theme.spacing.unit * 3,
		[theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
			width: 400,
			marginLeft: 'auto',
			marginRight: 'auto',
		},
	},
	paper: {
		marginTop: theme.spacing.unit * 8,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
	},
	avatar: {
		margin: theme.spacing.unit,
		backgroundColor: theme.palette.secondary.main,
	},
	submit: {
		marginTop: theme.spacing.unit * 3,
	},
})

function CallList(props) {
	const { classes } = props

  const [name, setName] = useState('')
  const [property, setProperty] = useState('')
  const [question, setQuestion] = useState('')
  const [resolution, setResolution] = useState('')

	useEffect(() => {
		firebase.getCallRecord().then(setName)
		firebase.getCallRecord().then(setProperty)
		firebase.getCallRecord().then(setQuestion)
		firebase.getCallRecord().then(setResolution)
	})

	return (
		<main className={classes.main}>
			<Paper className={classes.paper}>
				<Typography component="h1" variant="h5">
          Call Records          
        </Typography>
				<Typography component="h1" variant="h5">
					Client's name: {name ? `"${name}"` : <CircularProgress size={20} />}
				</Typography>
				<Typography component="h1" variant="h5">
					Property: {property ? `"${property}"` : <CircularProgress size={20} />}
				</Typography>
				<Typography component="h1" variant="h5">
					Question: {question ? `"${question}"` : <CircularProgress size={20} />}
				</Typography>
				<Typography component="h1" variant="h5">
					Resolution: {resolution ? `"${resolution}"` : <CircularProgress size={20} />}
				</Typography>
				<Button
					type="submit"
					fullWidth
					variant="contained"
					color="secondary"
					onClick={logout}
					className={classes.submit}>
					Logout
          		</Button>
			</Paper>
		</main>
	)

	async function logout() {
		await firebase.logout()
		props.history.push('/')
	}
}

export default withRouter(withStyles(styles)(CallList))