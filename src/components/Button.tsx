import classNames from 'classnames'
import type { ButtonProps } from '@/types'

function Button({ children, className, ...props }: ButtonProps) {
  return (
    <button
      className={classNames(
        'rounded text-sm transition duration-200',
        {
          'opacity-50 cursor-not-allowed': props.disabled,
        },
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
