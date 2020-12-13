import styles from './modules/LoadingButton.module.css'
import Button from 'react-bootstrap/Button'
import { BsArrowRepeat } from 'react-icons/bs'


export const LoadingButton = ({ isLoading, className = '', disabled = false, ...props }) => {
  return (
    <Button
      disabled={disabled || isLoading}
      className={`${styles.LoadingButton} ${className}`}
      {...props}
    >
      {isLoading && <BsArrowRepeat className={styles.spinning} />}
      {props.children}
    </Button>
  )
}