import React, { useState } from 'react'
import cn from 'classnames'
import styles from './Entry.module.sass'
import TextInput from '../../../components/TextInput'
import Image from '../../../components/Image'
import { useAuth } from '../../../contexts/AuthContext'

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

const Entry = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	// const [isSubmitting, setIsSubmitting] = useState(false)

	const { register, signInWithGoogle } = useAuth()

	return (
		<div className={styles.entry}>
			<div className={styles.head}>
				{/* <div className={styles.info}>Sign up with</div> */}
				<div className={styles.btns}>
					<button onClick={() =>
								signInWithGoogle()
									.then((user) => console.log(user))
									.catch((error) => console.log(error))
							}className={cn('button-stroke', styles.button)}>
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
					register(email, password)
						.then((response) => console.log(response))
						.catch((error) => {
							console.log(error.message)
							authError()
						})
				}}
			>
				<div className={styles.body}>
					<div className={styles.info}>Or register with email address</div>
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
						placeholder='Your password'
						required
						icon='lock'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<button type='submit' className={cn('button', styles.button)}>
						Sign up
					</button>
					<div className={styles.note}>
						This site is protected by reCAPTCHA and the Google Privacy Policy.
					</div>
				</div>
			</form>
		</div>
	)
}

export default Entry
