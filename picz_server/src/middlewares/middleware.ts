import express, { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'

export const handleInputErrors = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.status(400)
    res.json({ errors: errors.array() })
  } else {
    next()
  }
}

import { ClerkExpressWithAuth } from '@clerk/clerk-sdk-node'

export const authenticateUser = (req: Request, res: Response) => {
  try {
    res.status(200).json({ message: 'Authenticated', user: 'user' })
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized', error: 'error' })
  }
}
