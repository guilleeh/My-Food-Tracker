import Router from 'next/router'
import { useState } from 'react'
import Form from 'react-bootstrap/Form'
import { LoadingButton } from './LoadingButton'

import { Auth } from "aws-amplify";
import { useAppContext } from '../libs/context'
import { onError } from '../libs/error'
import { useFormFields } from '../libs/hooks'


export const LoginForm = () => {
  const [fields, handleFieldChange] = useFormFields({
    email: '',
    password: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const { setLoggedIn } = useAppContext();

  const validateForm = () => {
    return fields.email.length > 0 && fields.password.length > 0;
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    setIsLoading(true)

    try {
      await Auth.signIn(fields.email, fields.password)
      setLoggedIn(true)
      Router.push('/')
    } catch (e) {
      onError(e)
      setIsLoading(false)
    }
  }

  return (
    <>
      <div className="Login">
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
          <LoadingButton block type='submit' disabled={!validateForm()} isLoading={isLoading}>
            Login
          </LoadingButton>
        </Form>
      </div>
      <style jsx>
        {
          `
          .Login {
            padding: 60px 0;
            margin: 0 auto;
            max-width: 320px;
          }

          .pass {
            font-size: 30px;
          }
        `
        }

      </style>
    </>
  )
}