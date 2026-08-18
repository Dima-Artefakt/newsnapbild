export interface ProcessStep {
  image: string
  name: string
  desc: string
}

export const processSteps: ProcessStep[] = [
  {
    image: '/84a4450b3827bc21.webp',
    name: 'Дизайн-система — ядро платформы',
    desc: 'Ваши компоненты, цвета и шрифты — единственный источник стиля',
  },
  {
    image: '/process-flexible-configuration.webp',
    name: 'Гибкая конфигурация',
    desc: 'Правила бренда задаются один раз — работают в каждой генерации',
  },
  {
    image: '/afe03eb4a67d5dfb.webp',
    name: 'Соответствие по умолчанию',
    desc: 'AI не может нарушить бренд: сайты, изображения, видео, баннеры и презентации — строго по вашим правилам',
  },
]