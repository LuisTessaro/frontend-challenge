import React from 'react'
import './style.scss'

import axios from 'axios'
import { Formik } from 'formik'
import * as Yup from 'yup'

function CreateNew({ history, ...props }) {
	const api = 'https://pland-api.herokuapp.com'

	async function onSubmit(values, { setSubmitting }) {
		try {
			setSubmitting(true)
			const token = localStorage.getItem('auth_token')
			const headers = { headers: { Authorization: `JWT ${token}` } }
			const { data } = await axios.post(api + "/api/v1.0/places/new", values, headers)
			setSubmitting(false)
			history.push('/')
		} catch (e) {
			localStorage.clear()
			history.push('/login')
		}
	}

	return (
		<div className="new-place-container">
			<h1>Criar novo lugar</h1> 
			<Formik
				initialValues={{
					name: '',
					slug: '',
					city: '',
					state: '',
				}}
				onSubmit={onSubmit}

				validationSchema={
					Yup.object().shape({
						name: Yup.string().required('Digite um nome válido'),
						slug: Yup.string().matches(/^\S*$/, 'Espaço no slug não é permitido').required('Digite um slug válido'),
						city: Yup.string().required('Digite um cidade válida'),
						state: Yup.string().required('Digite um estado válido'),
					})}
			>
				{
					({ values, errors, touched, handleSubmit, handleChange, handleBlur, isSubmitting, setValues }) => (
						<form className="new-place-form">

							<div className="form-group">
								<label htmlFor="name">Nome</label>
								<input
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.name}
									name="name"
									id="name">
								</input>
								{errors.name && touched.name && <h5>{errors.name}</h5>}
							</div>

							<div className="form-group">
								<label htmlFor="slug">Slug</label>
								<input
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.slug}
									name="slug"
									id="slug">
								</input>
								{errors.slug && touched.slug && <h5>{errors.slug}</h5>}
							</div>

							<div className="form-group">
								<label htmlFor="city">Cidade</label>
								<input
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.city}
									name="city"
									id="city">
								</input>
								{errors.city && touched.city && <h5>{errors.city}</h5>}
							</div>

							<div className="form-group">
								<label htmlFor="state">Estado</label>
								<input
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.state}
									name="state"
									id="state">
								</input>
								{errors.state && touched.state && <h5>{errors.state}</h5>}
							</div>

							<input type="submit" onClick={handleSubmit} disabled={isSubmitting} value="Criar Novo Lugar" />
						</form>
					)
				}
			</Formik>
		</div>
	)
}

export default CreateNew