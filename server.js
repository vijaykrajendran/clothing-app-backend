const express = require('express')
const cors = require('cors')
require('dotenv').config()

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' })
})

// Basic API endpoint
app.get('/api/status', (req, res) => {
  res.json({ status: 'API is working' })
})

// Simple route for testing
app.get('/api/products', async (req, res) => {
  try {
    res.json({ 
      message: 'Products endpoint',
      products: []
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Something went wrong' })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

