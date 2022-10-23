import ImageArrows from './images/controls/arrows.png'
import ImageCtrl from './images/controls/ctrl.png'
import ImageEsc from './images/controls/esc.png'
import ImageF from './images/controls/f.png'
import ImageP from './images/controls/p.png'
import ImageSpace from './images/controls/space.png'

interface IControl {
  image: string[]
  alt: string[]
  description: string
}

export const controls: IControl[] = [
  {
    image: [ImageArrows],
    alt: ['Стрелки'],
    description: 'Управление персонажем',
  },
  {
    image: [ImageSpace],
    alt: ['Пробел'],
    description: 'Поставить бомбу',
  },
  {
    image: [ImageCtrl],
    alt: ['Клавиша Ctrl'],
    description: 'Взорвать самую старую бомбу (при наличии детонатора)',
  },
  {
    image: [ImageEsc, ImageP],
    alt: ['Клавиша Esc', 'Клавиша P'],
    description: 'Пауза',
  },
  {
    image: [ImageF],
    alt: ['Клавиша F'],
    description: 'Полноэкранный режим',
  },
]
