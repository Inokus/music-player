import classNames from 'classnames'
import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import useStore from '@/store'
import Button from './Button'
import type { Notification } from '@/types'

const Toast = ({ notification }: { notification: Notification }) => {
  const notifications = useStore(state => state.notifications)
  const removeNotification = useStore(state => state.removeNotification)

  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  useEffect(() => {
    const durationMap = {
      error: 5000,
      warning: 3000,
      info: 2000,
    }

    const duration = durationMap[notification.type] || 3000

    const fadeOutTimer = setTimeout(() => {
      setIsVisible(false)
    }, duration)

    const removeTimer = setTimeout(() => {
      removeNotification(notification.id)
    }, duration + 150)

    return () => {
      clearTimeout(fadeOutTimer)
      clearTimeout(removeTimer)
    }
  }, [notification, removeNotification])

  if (notifications.length === 0) {
    return null
  }

  return (
    <li
      className={classNames(
        'pr-6 py-2 pl-2 flex flex-col items-center text-sm text-text-100 rounded-lg shadow-lg transition-opacity hover:opacity-100',
        {
          'bg-alert-error': notification.type === 'error',
          'bg-alert-warning': notification.type === 'warning',
          'bg-alert-info': notification.type === 'info',
          'opacity-0': !isVisible,
          'opacity-90': isVisible,
        },
      )}
      role={notification.type === 'info' ? 'status' : 'alert'}
      aria-live={notification.type === 'error' ? 'assertive' : 'polite'}
    >
      <Button
        type="button"
        onClick={() => removeNotification(notification.id)}
        className="absolute top-2 right-2"
        aria-label="Close"
      >
        <FontAwesomeIcon icon={faXmark} />
      </Button>
      <span className="">{notification.message}</span>
    </li>
  )
}

export default Toast
