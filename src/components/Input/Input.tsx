import React from 'react'
import styles from './input.module.sass'
import clsx from 'clsx'

const Input: React.FC<React.HTMLAttributes<HTMLInputElement> & { value?: string }> = ({ value, className,...props }) => {
  return (
    <div className={clsx(styles.form, className)}>
      <input value={value} {...props} className={styles.input} />
    </div>
  )
}

export default Input;