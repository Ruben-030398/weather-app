import React from 'react'
import styles from './button.module.sass';
import clsx from 'clsx';

const Button: React.FC<React.HTMLAttributes<HTMLButtonElement>> = ({ className, ...props }) => {
  return (
    <button {...props} className={clsx(styles.btn, className) }>{props.children}</button>
  )
}

export default Button