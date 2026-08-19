import { ReactNode, ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'gradient'
  className?: string
}

export const Button = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  ...props 
}: ButtonProps) => {
  const baseStyles = 'inline-flex items-center justify-center font-semibold transition-all duration-300 rounded-xl cursor-pointer'
  const variants = {
    primary: 'bg-white text-black hover:bg-black hover:text-white',
    secondary: 'bg-black text-white hover:bg-gray-800',
    gradient: 'bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400 text-white hover:scale-95',
  }
  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  )
}