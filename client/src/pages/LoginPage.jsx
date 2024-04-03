import React, { useState } from 'react'
import { setLogin } from '../redux/state';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"

import { IoMdMail } from "react-icons/io";
import { FaLock } from "react-icons/fa";
import "../styles/LoginPage.scss";

export default function LoginPage2 () {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errorMessage, setErrorMessage] = useState("");

	const dispatch = useDispatch();
	const navigate = useNavigate()

	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			const response = await fetch("https://dream-travel-server-beta.vercel.app/auth/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({ email, password })
			})

			const loggedIn = await response.json()

			if (response.ok) {
				dispatch(
					setLogin({
						user: loggedIn.user,
						token: loggedIn.token
					})
				)
				navigate("/")
			}	else {
				setErrorMessage("Please re-enter your account")
			}

		} catch (err) {
			console.log("Login failed!", err.message)
			setErrorMessage("Login failed! Please re-enter your account")
		}
	}

	return (
		<div className="login">
			<div className="login_content">
				<form className="login_content_form" onSubmit={handleSubmit}>
					<h2>Login</h2>

					<div className="input-box">
						<IoMdMail className="icon" />
						<input 
							type="email" 
							placeholder='Email' 
							value={email} 
							onChange={(e) => setEmail(e.target.value) } 
							required 
						/>
					</div>
					<div className="input-box">
						<FaLock className="icon" />
						<input 
							type="password" 
							placeholder='Password'
							value={password} 
							onChange={(e) => setPassword(e.target.value) } 
							required 
						/>
					</div>
					<p className="error">{errorMessage}</p>

					<button type="submit" className="btn">Login</button>
					<a href='/register'>Don's have an account? Sign In Here</a>
				</form>
			</div>
		</div>
	)
}
