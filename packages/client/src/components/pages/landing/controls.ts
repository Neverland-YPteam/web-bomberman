import ImageArrows from './images/controls/arrows.png'
import ImageCtrl from './images/controls/ctrl.png'
import ImageEsc from './images/controls/esc.png'
import ImageP from './images/controls/p.png'
import ImageSpace from './images/controls/space.png'

interface IControl {
  image: string
  alt: string
  description: string
}

export const controls: IControl[] = [
  {
    image: ImageArrows,
    alt: 'Стрелки',
    description: 'Управление персонажем',
  },
  {
    image: ImageCtrl,
    alt: 'Клавиша Ctrl',
    description: 'Поставить бомбу',
  },
  {
    image: ImageEsc,
    alt: 'Клавиша Esc',
    description: 'Взорвать самую старую бомбу (при наличии детонатора)',
  },
  {
    image: ImageP,
    alt: 'Клавиша P',
    description: 'Пауза',
  },
  {
    image: ImageSpace,
    alt: 'Пробел',
    description: 'Полноэкранный режим',
  },
]
