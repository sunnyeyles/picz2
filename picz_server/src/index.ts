import * as dotenv from 'dotenv'
dotenv.config()
import app from './server.js'

// app.post('/api/webhooks/clerk', (req, res) => {
//   console.log('Webhook received:', req.body)

//   res.status(200).send({ message: 'Webhook received' })
// })
app.listen(3000, () => {
  console.log('hello on http://localhost:3000')
})
