import styles from './modules/Loading.module.css'
import { BsArrowRepeat } from 'react-icons/bs'


export const Loading = () => {
  return (
    <div className={styles.container}>
      <BsArrowRepeat size='5rem' className={styles.spinning} />
    </div>
  )
}