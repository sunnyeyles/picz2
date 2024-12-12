import { Request, Response, NextFunction } from 'express'

type RateLimitOptions = {
  windowMs?: number
  maxRequests?: number
  message?: string
  onLimitReached?: (req: Request, res: Response) => void
}

const requestStore = new Map<string, { count: number; startTime: number }>()

export const rateLimit = (options: RateLimitOptions) => {
  const {
    // 1 min time window
    windowMs = 60000,
    maxRequests = 100,
    message = 'Too many requests.',
    onLimitReached,
  } = options

  return (req: Request, res: Response, next: NextFunction): void => {
    // fallback to an empty string if req.ip is undefined
    const key = req.ip || ''
    const currentTime = Date.now()
    // retrieve client's data or initialize it
    let clientData = requestStore.get(key) || {
      count: 0,
      startTime: currentTime,
    }
    // reset count if the time window has passed
    if (currentTime - clientData.startTime > windowMs) {
      clientData = { count: 0, startTime: currentTime }
    }
    // increment count
    clientData.count++
    if (clientData.count > maxRequests) {
      if (onLimitReached) onLimitReached(req, res) // Invoke custom callback if provided
      res.status(429).json({ error: message })
    } else {
      // update the store
      requestStore.set(key, clientData)
      next()
    }
  }
}
