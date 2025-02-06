import useStore from '@/store'
import Toast from './Toast'

const ToastNotifications = () => {
  const notifications = useStore(state => state.notifications)

  if (notifications.length === 0) {
    return null
  }

  return (
    <ul className="fixed top-4 right-4 w-64 flex flex-col gap-2 z-50">
      {notifications.map(notification => (
        <Toast notification={notification} key={notification.id} />
      ))}
    </ul>
  )
}

export default ToastNotifications
