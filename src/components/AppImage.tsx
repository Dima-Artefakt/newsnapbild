'use client'

interface AppImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string
  alt: string
}

export const AppImage = ({ src, alt, ...props }: AppImageProps) => {
  const basePath = process.env.NODE_ENV === 'production' ? '/newsnapbild' : ''
  const imageSrc = `${basePath}${src}`
  
  return <img src={imageSrc} alt={alt} {...props} />
}