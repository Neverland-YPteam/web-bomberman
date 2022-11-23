import type { Request, Response, NextFunction } from 'express'

export abstract class BaseRESTService {
  abstract create?: (req: Request, res: Response, next: NextFunction) => unknown
  abstract request?: (req: Request, res: Response, next: NextFunction) => unknown
  abstract update?: (req: Request, res: Response, next: NextFunction) => unknown
  abstract delete?: (req: Request, res: Response, next: NextFunction) => unknown
  abstract find?: (req: Request, res: Response, next: NextFunction) => unknown
}
