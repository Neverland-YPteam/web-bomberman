import ImageBalloon from './images/enemies/balloon.png'
import ImageBeaker from './images/enemies/beaker.png'
import ImageLantern from './images/enemies/lantern.png'
import ImageFace from './images/enemies/face.png'
import ImageGhost from './images/enemies/ghost.png'
import ImageJelly from './images/enemies/jelly.png'
import ImageBear from './images/enemies/bear.png'
import ImageCoin from './images/enemies/coin.png'

interface IEnemy {
  name: string
  image: string
  alt: string,
  speed: number
  score: number
  description: string
}

export const enemies: IEnemy[] = [
  {
    name: 'Balloon',
    image: ImageBalloon,
    alt: 'Воздушный шар',
    speed: 1,
    score: 100,
    description: 'Может поворачивать в конце'
  },
  {
    name: 'Beaker',
    image: ImageBeaker,
    alt: 'Химический сосуд',
    speed: 1.5,
    score: 200,
    description: 'Может поворачивать в любом месте'
  },
  {
    name: 'Lantern',
    image: ImageLantern,
    alt: 'Фонарь',
    speed: 2,
    score: 400,
    description: 'Двигается вперед-назад'
  },
  {
    name: 'Face',
    image: ImageFace,
    alt: 'Лицо',
    speed: 2.4,
    score: 800,
    description: 'Двигается вперед-назад'
  },
  {
    name: 'Ghost',
    image: ImageGhost,
    alt: 'Призрак',
    speed: 1.5,
    score: 1000,
    description: 'Может поворачивать в любом месте и ходить сквозь стены'
  },
  {
    name: 'Jelly',
    image: ImageJelly,
    alt: 'Желе',
    speed: 0.5,
    score: 2000,
    description: 'Может поворачивать в любом месте и ходить сквозь стены'
  },
  {
    name: 'Bear',
    image: ImageBear,
    alt: 'Медведь',
    speed: 3,
    score: 4000,
    description: 'Может поворачивать в любом месте'
  },
  {
    name: 'Coin',
    image: ImageCoin,
    alt: 'Монета',
    speed: 3.2,
    score: 8000,
    description: 'Может поворачивать в любом месте и ходить сквозь стены'
  },
]
