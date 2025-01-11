import { motion } from 'framer-motion'

export function Button({ children, className = 'btn', ...rest }) {
  // If you want to use the className prop, you just need to pass it null as a prop to the Button component
  const btnClassName = className == null ? undefined : 'btn ' + className
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.05 }}
      type='button'
      className={`${btnClassName || ''}`}
      {...rest}
    >
      {children}
    </motion.button>
  )
}
