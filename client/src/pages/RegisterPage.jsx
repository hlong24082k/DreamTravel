import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom"
import "../styles/Register.scss";

export default function RegisterPage() {
	const [profileImage, setProfileImage] = useState(null)
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		confirmPassword: "",
		// profileImage: null
	})

	function convertToBase64(file) {
		return new Promise((resolve, reject) => {
			const fileReader = new FileReader();
			fileReader.readAsDataURL(file);
			fileReader.onload = () => {
				resolve(fileReader.result)
			};
			fileReader.onerror = (error) => {
				reject(error)
			}
		})
	}

	const handleFileUpload = async (e) => {
		const file = e.target.files[0];
		const base64 = await convertToBase64(file);
		setProfileImage(base64)
	}

	const handleChange = (e) => {
		const { name, value, files } = e.target
		setFormData({
			...formData,
			[name]: value,
		})
	}

	const [passwordMatch, setPasswordMatch] = useState(true);

	useEffect(() => {
		setPasswordMatch(formData.password === formData.confirmPassword || formData.confirmPassword === "")
	})

	const navigate = useNavigate()
	const handleSubmit = async (e) => {
		e.preventDefault()

		try {
			const register_form = new FormData()

			formData.profileImage = profileImage

			for (var key in formData) {
				register_form.append(key, formData[key])
			}

			const response = await fetch("https://dream-travel-server-beta.vercel.app/auth/register", {
				method: "POST",
				body: register_form
			})

			if (response.ok) {
				navigate("/login")
			}

		} catch (err) {
			console.log("Registration failed!", err.message)
		}
	}

	return (
		<div className='register'>
			<div className="register_content">
				<form className='register_content_form' onSubmit={handleSubmit}>
					<input
						placeholder='First Name'
						name='firstName'
						value={formData.firstName}
						onChange={handleChange}
						required
					/>

					<input
						placeholder='Last Name'
						name='lastName'
						value={formData.lastName}
						onChange={handleChange}
						required
					/>

					<input
						placeholder='Email'
						name='email'
						type='email'
						value={formData.email}
						onChange={handleChange}
						required
					/>

					<input
						placeholder='Password'
						name='password'
						type='password'
						value={formData.password}
						onChange={handleChange}
						required
					/>

					<input
						placeholder='Confirm Password'
						name='confirmPassword'
						type='password'
						value={formData.confirmPassword}
						onChange={handleChange}
						required
					/>

					{!passwordMatch && (
						<p style={{ color: "red" }}>Passwords are not matched!</p>
					)}

					<input
						id="image"
						type='file'
						name='profileImage'
						accept='image/*'
						style={{ display: "None" }}
						onChange={handleFileUpload}
						required
					/>

					<label htmlFor='image'>
						<img src="/assets/addImage.png" alt="add profile photo" />
						<p>Upload Your Photo</p>
					</label>

					{profileImage && (
						<img
							// src={URL.createObjectURL(formData.profileImage)}
							src={profileImage}
							alt="profile photo"
							style={{ maxWidth: "80px" }}
						/>
					)}

					<button type='submit' disabled={!passwordMatch}>REGISTER</button>
				</form>

				<a href='/login'>Already have an account? Log In Here</a>
			</div>

		</div>
	)
}
