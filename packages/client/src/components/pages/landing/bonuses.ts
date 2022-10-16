import ImageBomb from './images/bonuses/bomb.png'
import ImageFire from './images/bonuses/fire.png'
import ImageSpeed from './images/bonuses/speed.png'
import ImageDetonator from './images/bonuses/detonator.png'
import ImageWallpass from './images/bonuses/wallpass.png'
import ImageBombpass from './images/bonuses/bombpass.png'
import ImageFirepass from './images/bonuses/firepass.png'
import ImageImmortal from './images/bonuses/immortal.png'

interface IBonus {
  name: string
  image: string
  alt: string
  canBeLost: boolean
  description: string
}

export const bonuses: IBonus[] = [
  {
    name: 'Bomb',
    image: ImageBomb,
    alt: 'Бонус «Бомба»',
    canBeLost: false,
    description: 'Позволяет одновременно размещать на одну бомбу больше',
  },
  {
    name: 'Fire',
    image: ImageFire,
    alt: 'Бонус «Дальность взрыва»',
    canBeLost: true,
    description: 'Увеличивает дальность взрыва на 1',
  },
  {
    name: 'Speed',
    image: ImageSpeed,
    alt: 'Бонус «Скорость»',
    canBeLost: true,
    description: 'Немного увеличивает скорость передвижения героя',
  },
  {
    name: 'Detonator',
    image: ImageDetonator,
    alt: 'Бонус «Детонатор»',
    canBeLost: true,
    description: 'Позволяет взрывать бомбы вручную. При использовании взрывается самая старая бомба',
  },
  {
    name: 'Wallpass',
    image: ImageWallpass,
    alt: 'Бонус «Передвижение сквозь стены»',
    canBeLost: true,
    description: 'Позволяет двигаться сквозь стены',
  },
  {
    name: 'Bombpass',
    image: ImageBombpass,
    alt: 'Бонус «Передвижение сквозь бомбы',
    canBeLost: true,
    description: 'Позволяет двигаться сквозь бомбы',
  },
  {
    name: 'Firepass',
    image: ImageFirepass,
    alt: 'Бонус «Огнеупорность»',
    canBeLost: true,
    description: 'Главный герой не погибает от взрывов',
  },
  {
    name: 'Immortal',
    image: ImageImmortal,
    alt: 'Бонус «Неуязвимость»',
    canBeLost: true,
    description: 'Временная неуязвимость. Действует 20 секунд',
  },
]
