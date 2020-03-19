import React, { useEffect } from 'react'

import './style.scss'

import { Formik } from 'formik'
import * as Yup from 'yup'

function Modal({
  isOpen,
  onClose,
  onComplete,
  data,
  open,
  close,
  ...props
}) {
  return isOpen ? (
    <div className={`modal${isOpen ? ' modal-open' : ''}`}>
      <div className="modal-background" />
      <div className="modal-content">
        <div className="modal-header">
          <h1>Editar</h1>
          <i className="far fa-times-circle" onClick={() => close()}></i>
        </div>
        <div className="modal-body">

          <Formik
            initialValues={{
              id: data ? data.id : 1,
              name: data ? data.name : '',
              slug: data ? data.slug : '',
              city: data ? data.city : '',
              state: data ? data.state : '',
              nameOld: data ? data.name : '',
              slugOld: data ? data.slug : '',
              cityOld: data ? data.city : '',
              stateOld: data ? data.state : '',
            }}
            onSubmit={onComplete}
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
                <form className="edit-form">
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

                  <input type="submit" onClick={handleSubmit} disabled={isSubmitting} value="Editar Lugar" />
                </form>
              )
            }
          </Formik>

        </div>
      </div>
    </div>
  ) : null
}

export default Modal