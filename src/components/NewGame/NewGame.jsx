import {
  ErrorMessage, Field, Form, Formik,
} from 'formik'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { setPlayer } from '../../redux/slices/gameSlices/gameSlices'
import { MIN_ERROR_MESSAGE, REQUIRED_ERROR_MESSAGE } from '../../utils/constants'
import { Modal } from '../Modal/Modal'
import styles from './newGame.module.scss'

export const NewGame = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [isOpen, setIsOpen] = useState(false)

  const clickHandler = () => {
    setIsOpen(true)
  }

  const closeHandler = () => {
    setIsOpen(false)
  }

  const submitHandler = (values) => {
    dispatch(setPlayer(values)) 
    navigate('game')
    closeHandler()
  }
  return (
    <div className={styles.wr}>
      <button type="button" onClick={clickHandler} className="btn btn-dark">Новая игра</button>
      <Modal isOpen={isOpen} closeHandler={closeHandler}>
        <div>
          <h2>Начать игру?</h2>
          <Formik
            initialValues={{
              name: '',
              level: ''
            }}
            validationSchema={Yup.object(
              {
                name: Yup.string()
                  .required(REQUIRED_ERROR_MESSAGE)
                  .min(2, MIN_ERROR_MESSAGE)
                  .matches(/^\S*$/, 'not space'),
              },
            )}
            onSubmit={submitHandler}
          >
            <Form className={styles.editForm}>
              
              <Field name="name" placeholder="Введите имя игрока" type="text" />
              <ErrorMessage component="span" className={styles.error} name="name" />

              <Field name="level" placeholder="Выберете уровень сложности" as='select'>
                <option disabled value="">Уровень сложности</option>
                <option value="8">Простой 8х8</option>
                <option value="16">Средний 16х16</option>
                {/* <option value="32">Сложный 32х16</option> */}
              </Field>  
              <ErrorMessage component="span" className={styles.error} name="level" />

              <button type="submit" className="btn btn-primary">Начать игру</button>
            </Form>
          </Formik>
        </div>
      </Modal>
    </div>
  )
}
