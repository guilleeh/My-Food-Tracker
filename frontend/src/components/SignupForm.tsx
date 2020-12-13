import Router from 'next/router'
import { useState } from 'react'
import Form from 'react-bootstrap/Form'
import { LoadingButton } from './LoadingButton'
import styles from './modules/Signup.module.css'

import { Auth } from "aws-amplify";
import { useAppContext } from '../libs/context'
import { onError } from '../libs/error'
import { useFormFields } from '../libs/hooks'


export const SignupForm = () => {
  const [fields, handleFieldChange] = useFormFields({
    email: '',
    password: '',
    confirmPassword: '',
    confirmationCode: ''
  })
  const [newUser, setNewUser] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const { setLoggedIn } = useAppContext();

  const validateForm = () => {
    return fields.email.length > 0 && fields.password.length > 0 && fields.password === fields.confirmPassword;
  }

  const validateConfirmationForm = () => {
    return fields.confirmationCode.length > 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    setIsLoading(true)

    try {
      const newUser = await Auth.signUp({
        username: fields.email,
        password: fields.password
      })
      setIsLoading(false)
      setNewUser(newUser)
    } catch (e) {
      onError(e)
    } finally {
      setIsLoading(false);
    }
  }

  const handleConfirmationSubmit = async (e) => {
    e.preventDefault()

    setIsLoading(true)

    try {
      await Auth.confirmSignUp(fields.email, fields.confirmationCode)
      await Auth.signIn(fields.email, fields.password)

      setLoggedIn(true)
      Router.push('/')
    } catch (e) {
      onError(e)
    } finally {
      setIsLoading(false)
    }
  }

  const renderConfirmationForm = () => {
    return (
      <Form onSubmit={handleConfirmationSubmit}>
        <Form.Group controlId='confirmationCode'>
          <Form.Label>Confirmation Code</Form.Label>
          <Form.Control autoFocus type='tel' onChange={handleFieldChange} value={fields.confirmationCode} />
        </Form.Group>
        <LoadingButton block size='lg' type='submit' variant='success' isLoading={isLoading} disabled={!validateConfirmationForm()}>
          Verify
        </LoadingButton>
      </Form>
    )
  }

  const renderForm = () => {
    return (
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId='email'>
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type='email'
            value={fields.email}
            onChange={handleFieldChange}
          />
        </Form.Group>
        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            className='pass'
            type='password'
            value={fields.password}
            onChange={handleFieldChange}
          />
        </Form.Group>
        <Form.Group controlId='confirmPassword'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            value={fields.confirmPassword}
            onChange={handleFieldChange}
          />
        </Form.Group>
        <LoadingButton block type='submit' disabled={!validateForm()} isLoading={isLoading}>
          Signup
            </LoadingButton>
      </Form>
    )
  }

  return (
    <div className={styles.Signup}>
      {newUser ? renderConfirmationForm() : renderForm()}
    </div>
  )
}