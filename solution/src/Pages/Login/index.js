import React, { useState } from 'react';
import './style.scss'

import axios from 'axios';
import { Formik } from 'formik'
import * as Yup from 'yup'

function Login({ history, ...props }) {
	const api = 'https://pland-api.herokuapp.com'
	
	const [error, setError] = useState(false)

	async function onSubmit(values, { setSubmitting }) {
		setSubmitting(true)
		try {
			const { data } = await axios.post(api + "/auth", values)
			const { access_token } = data
			localStorage.setItem("auth_token", access_token)
			setSubmitting(false)
			history.push('/')
		} catch (e) {
			setError(true)
		}
	}

	return (
		<div className="login-container">
			<h1>Login</h1>
			<h3>Acesse sua conta para gerenciar seus locais</h3>
			<p className={error ? 'display-error' : ''}>Conta inválida</p>
			<Formik
				className="login-form"
				initialValues={{
					username: '',
					password: ''
				}}
				onSubmit={onSubmit}

				validationSchema={
					Yup.object().shape({
						username: Yup.string().required('Escreva um usuário válido'),
						password: Yup.string().required('Escreva uma senha válido')
					})}
			>
				{
					({ values, errors, touched, handleSubmit, handleChange, handleBlur, isSubmitting, setValues }) => (
						<form className="login-form">

							<div className="form-group">
								<label htmlFor="username">Username</label>
								<input
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.username}
									placeholder=""
									name="username"
									id="username">
								</input>
								{errors.username && touched.username && <h5>{errors.username}</h5>}
							</div>

							<div className="form-group">
								<label htmlFor="password">Password</label>
								<input
									type="password"
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.password}
									name="password"
									id="password">
								</input>
								{errors.password && touched.password && <h5>{errors.password}</h5>}
							</div>

							<input type="submit" onClick={handleSubmit} disabled={isSubmitting} value="Login" />
						</form>
					)
				}
			</Formik>
		</div>
	)
}

export default Login