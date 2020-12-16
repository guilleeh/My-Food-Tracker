import { useRef, useState, useEffect } from 'react'
import Router from 'next/router'
import { useRouter } from 'next/router'
import { API, Storage } from 'aws-amplify'
import { uploadFile } from '../api/logs-api'
import { onError } from '../libs/error'
import Image from 'react-bootstrap/Image'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import { LoadingButton } from './LoadingButton'
import styles from './modules/EditFoodLog.module.css'


export const EditFoodLog = () => {
  const file = useRef(null)
  const router = useRouter()
  const { id } = router.query
  const [foodLog, setFoodLog] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const loadFoodLog = () => {
      return API.get('logs', `logs/${id}`, '')
    }

    const onLoad = async () => {
      try {
        const log = await loadFoodLog()
        const { item } = log
        const foodLog = item[0]
        setFoodLog(foodLog)
      } catch (e) {
        onError(e)
      }
    }

    if (id)
      onLoad()
  }, [id])

  const saveFoodLog = (foodLog) => {
    const calories = Number(foodLog.calories)
    const log = {
      name: foodLog.name,
      calories,
      type: foodLog.type
    }

    return API.patch("logs", `logs/${foodLog.foodLogId}`, {
      body: log
    })
  }

  const getSignedUrl = (info) => {
    return API.post('logs', 'logs/upload', {
      body: info
    })
  }

  const deleteFoodLog = () => {
    return API.del('logs', `logs/${id}`, '')
  }

  const validateForm = () => {
    const { name, type, calories } = foodLog
    return name.length > 0 && calories > 0 && type !== 'Choose food type...'
  }

  const handleFieldChange = (e) => {
    setFoodLog({
      ...foodLog, [e.target.id]: e.target.value
    })
  }

  const handleFileChange = (e) => {
    file.current = e.target.files[0]
  }

  const handleSubmit = async (e) => {
    let attachment;

    e.preventDefault();

    const max = Number(process.env.MAX_ATTACHMENT_SIZE)

    if (file.current && file.current.size > process.env.MAX_ATTACHMENT_SIZE) {
      alert(
        `Please pick a file smaller than ${max /
        1000000} MB.`
      );
      return;
    }

    setIsLoading(true);

    try {
      if (file.current) {
        const info = { foodLogId: id }

        const { uploadUrl } = await getSignedUrl(info)
        await uploadFile(uploadUrl, file.current)
      }

      await saveFoodLog(foodLog)
      Router.push('/logs')
    } catch (e) {
      onError(e)
      setIsLoading(false)
    }
  }

  const handleDelete = async (e) => {
    e.preventDefault()

    const confirmed = window.confirm("Are you sure you want to delete this log? (This cannot be undone.)")

    if (!confirmed)
      return

    setIsDeleting(true)

    try {
      await deleteFoodLog()
      Router.push('/logs')
    } catch (e) {
      onError(e)
      setIsDeleting(false)
    }
  }

  if (!foodLog)
    return null

  const { attachmentUrl, name, type, calories } = foodLog

  return (
    <div className={`${styles.maxWidth} container`}>
      <div className={styles.log}>
        {attachmentUrl && <Image src={attachmentUrl} rounded width='300' height='300' />}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="name">
            <Form.Label>Food Name</Form.Label>
            <Form.Control
              placeholder="Enter food name"
              value={name}
              onChange={handleFieldChange}
            />
          </Form.Group>
          <Form.Row>
            <Form.Group as={Col} controlId='calories'>
              <Form.Label>Calories</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter calories here'
                value={calories}
                onChange={handleFieldChange} />
            </Form.Group>
            <Form.Group as={Col} controlId='type'>
              <Form.Label>Food Type</Form.Label>
              <Form.Control
                as='select'
                value={type}
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
          <div className={styles.buttons}>
            <div className={styles.update}>
              <LoadingButton
                block
                type="submit"
                size="lg"
                variant="danger"
                onClick={handleDelete}
                isLoading={isDeleting}
              >
                Delete
          </LoadingButton>
            </div>
            <div className={styles.update}>
              <LoadingButton
                block
                type="submit"
                size="lg"
                variant="primary"
                isLoading={isLoading}
                disabled={!validateForm()}
              >
                Update
              </LoadingButton>
            </div>
          </div>
        </Form>
      </div>
    </div>
  )
}