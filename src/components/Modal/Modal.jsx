import { useEffect } from "react"
import { createPortal } from 'react-dom'
import { FaRegWindowClose } from 'react-icons/fa'
import modalStyles from './modal.module.scss'

export const ModalContent = ({ children, closeHandler }) => {
  useEffect(() => {
    const listenerHandler = (e) => {
      if (e.key === 'Escape') {
        closeHandler()
      }
    }

    document.addEventListener('keydown', listenerHandler)

    return () => {
      document.removeEventListener('keydown', listenerHandler)
    }
  }, [closeHandler])

  return (
    <div className={modalStyles.modalContent}>

      <FaRegWindowClose className={modalStyles.closeBtn} onClick={closeHandler} icon="fa-solid fa-xmark" />

      {children}
    </div>
  )
}

export const Modal = ({ closeHandler, isOpen = false, children }) => {
  if (!isOpen) return null

  const clickHandler = (e) => {
    if (e.target === e.currentTarget) {
      closeHandler()
    }
  }

  return createPortal(
    <div onClick={clickHandler} className={modalStyles.modalWr}>
      <ModalContent closeHandler={closeHandler}>
        {children}
      </ModalContent>
    </div>,
    document.getElementById('modal-root'),
  )
}