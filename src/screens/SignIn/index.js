import React, { useState } from 'react'
import cn from 'classnames'
import styles from './SignIn.module.sass'
import { use100vh } from 'react-div-100vh'
import { Link, useHistory } from 'react-router-dom'
import TextInput from '../../components/TextInput'
import Image from '../../components/Image'

// Use Auth Hook
import { useAuth } from '../../contexts/AuthContext'

//Toast
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

toast.configure()

const notify = () => {
	toast('Please enter valid credentials')
}

const authError = () => {
	toast('Authentication Error')
}
const SignIn = () => {
	const history = useHistory()
	const heightWindow = use100vh()
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const { login, signInWithGoogle } = useAuth()

	return (
		<div className={styles.login} style={{ minHeight: heightWindow }}>
			<div className={styles.wrapper}>
				<Link className={styles.logo} to='/'>
					<Image
						className={styles.pic}
						src='/images/logo-dark.png'
						srcDark='/images/logo-light.png'
						alt='Core'
					/>
				</Link>
				<div className={cn('h2', styles.title)}>Sign in</div>
				<div className={styles.head}>
					{/* <div className={styles.subtitle}>Sign up with Open account</div> */}
					<div className={styles.btns}>
						<button
							className={cn('button-stroke', styles.button)}
							onClick={() =>
								signInWithGoogle()
									.then((user) => console.log(user))
									.catch((error) => console.log(error))
							}
						>
							<img src='/images/content/google.svg' alt='Google' />
							Google
						</button>
						<button className={cn('button-stroke', styles.button)}>
							<Image
								className={styles.pic}
								src='/images/content/apple-dark.svg'
								srcDark='/images/content/apple-light.svg'
								alt='Apple'
							/>
							Apple ID
						</button>
					</div>
				</div>
				<form
					onSubmit={async (e) => {
						e.preventDefault()
						// console.log(email, password)
						if (!email || !password) {
							notify()
						}
						login(email, password)
							.then((response) => {
								console.log(response)
								history.push('/')
							})
							.catch((error) => {
								console.log(error.message)
								toast('Authentication Error')
							})
					}}
				>
					<div className={styles.body}>
						<div className={styles.subtitle}>
							Or continue with email address
						</div>
						<TextInput
							className={styles.field}
							name='email'
							type='email'
							placeholder='Your email'
							required
							icon='mail'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<TextInput
							className={styles.field}
							name='password'
							type='password'
							placeholder='Password'
							required
							icon='lock'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
						<button type='submit' className={cn('button', styles.button)}>
							Sign in
						</button>
						<div className={styles.note}>
							This site is protected by reCAPTCHA and the Google Privacy Policy.
						</div>
						<div className={styles.info}>
							Don’t have an account?{' '}
							<Link className={styles.link} to='/sign-up'>
								Sign up
							</Link>
						</div>
					</div>
				</form>
			</div>
		</div>
	)
}

export default SignIn
