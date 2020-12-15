import Router from 'next/router'
import { useRef, useState } from 'react'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import { LoadingButton } from './LoadingButton'
import { onError } from '../libs/error'
import { useFormFields } from '../libs/hooks'
import { uploadFile } from '../api/logs-api'
import { API } from "aws-amplify";
import styles from './modules/NewLog.module.css'

export const NewLogForm = () => {
  const file = useRef(null)
  const [fields, handleFieldChange] = useFormFields({
    calories: 0,
    name: '',
    type: ''
  })
  const [isLoading, setIsLoading] = useState(false)

  const validateForm = () => {
    return fields.name.length > 0 && fields.type !== 'Choose food type...' && fields.calories > 0
  }

  const handleFileChange = (e) => {
    file.current = e.target.files[0]
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (file.current && file.current.size > process.env.MAX_FILE_SIZE) {
      alert(`Please pick a file smaller than ${process.env.MAX_FILE_SIZE / 1000000}`)
      return;
    }

    setIsLoading(true)

    try {
      const { calories, name, type } = fields

      const content = {
        calories, name, type
      }

      const log = await createNewLog(content)
      const { item } = log
      const { foodLogId, userId } = item
      const info = { foodLogId, userId }

      if (file.current) {
        const { uploadUrl } = await getSignedUrl(info)
        await uploadFile(uploadUrl, file.current)
      }
      Router.push('/')
    } catch (e) {
      onError(e)
      setIsLoading(false)
    }
  }

  const createNewLog = (log) => {
    return API.post('logs', 'logs', {
      body: log
    })
  }

  const getSignedUrl = (info) => {
    return API.post('logs', 'logs/upload', {
      body: info
    })
  }

  return (
    <div className={styles.NewLog}>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Food Name</Form.Label>
          <Form.Control
            placeholder="Enter food name"
            value={fields.name}
            onChange={handleFieldChange}
          />
        </Form.Group>
        <Form.Row>
          <Form.Group as={Col} controlId='calories'>
            <Form.Label>Calories</Form.Label>
            <Form.Control
              type='number'
              placeholder='Enter calories here'
              value={fields.calories}
              onChange={handleFieldChange} />
          </Form.Group>

          <Form.Group as={Col} controlId='type'>
            <Form.Label>Food Type</Form.Label>
            <Form.Control
              as='select'
              value={fields.type}
              onChange={handleFieldChange}
            >
              <option>Choose food type...</option>
              <option>Vegetables</option>
              <option>Fruits</option>
              <option>Grains</option>
              <option>Meat</option>
              <option>Seafood</option>
              <option>Dairy</option>
              <option>Eggs</option>
            </Form.Control>
          </Form.Group>
        </Form.Row>
        <Form.Group controlId="file">
          <Form.Label>Attachment</Form.Label>
          <Form.Control onChange={handleFileChange} type="file" />
        </Form.Group>
        <LoadingButton
          block
          type="submit"
          size="lg"
          variant="primary"
          isLoading={isLoading}
          disabled={!validateForm()}
        >
          Create
        </LoadingButton>
      </Form>
    </div >
  )
}