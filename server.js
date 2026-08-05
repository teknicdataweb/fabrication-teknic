import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
})

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())

// Serve remote-control.html as root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'remote-control.html'))
})

const PROMPTS_FILE = path.join(__dirname, 'prompts-queue.json')

// Initialize prompts file
if (!fs.existsSync(PROMPTS_FILE)) {
  fs.writeFileSync(PROMPTS_FILE, JSON.stringify({ prompts: [] }, null, 2))
}

// Socket.io connection
io.on('connection', (socket) => {
  console.log('📱 Cliente conectado:', socket.id)

  // Send existing prompts
  const data = JSON.parse(fs.readFileSync(PROMPTS_FILE, 'utf-8'))
  socket.emit('load-prompts', data.prompts)

  // Receive new prompt
  socket.on('send-prompt', (prompt) => {
    const data = JSON.parse(fs.readFileSync(PROMPTS_FILE, 'utf-8'))
    const newPrompt = {
      id: Date.now(),
      text: prompt,
      status: 'pendiente',
      timestamp: new Date().toLocaleString('es-ES'),
    }
    data.prompts.unshift(newPrompt)
    fs.writeFileSync(PROMPTS_FILE, JSON.stringify(data, null, 2))

    console.log('✉️ Nuevo prompt recibido:', prompt)
    io.emit('new-prompt', newPrompt)
  })

  // Mark prompt as executed
  socket.on('execute-prompt', (id) => {
    const data = JSON.parse(fs.readFileSync(PROMPTS_FILE, 'utf-8'))
    const prompt = data.prompts.find((p) => p.id === id)
    if (prompt) {
      prompt.status = 'ejecutado'
      fs.writeFileSync(PROMPTS_FILE, JSON.stringify(data, null, 2))
      io.emit('prompt-executed', id)
      console.log('✅ Prompt ejecutado:', id)
    }
  })

  socket.on('disconnect', () => {
    console.log('📵 Cliente desconectado:', socket.id)
  })
})

// API REST endpoint
app.get('/api/prompts', (req, res) => {
  const data = JSON.parse(fs.readFileSync(PROMPTS_FILE, 'utf-8'))
  res.json(data.prompts)
})

app.post('/api/prompts/execute', (req, res) => {
  const { id } = req.body
  const data = JSON.parse(fs.readFileSync(PROMPTS_FILE, 'utf-8'))
  const prompt = data.prompts.find((p) => p.id === id)
  if (prompt) {
    prompt.status = 'ejecutado'
    fs.writeFileSync(PROMPTS_FILE, JSON.stringify(data, null, 2))
    io.emit('prompt-executed', id)
    res.json({ success: true })
  } else {
    res.status(404).json({ error: 'Prompt no encontrado' })
  }
})

const PORT = 3000
server.listen(PORT, '0.0.0.0', () => {
  console.log(`
╔════════════════════════════════════════════════╗
║  🚀 Control Remoto - Sistema Activo            ║
║                                                ║
║  📱 Accede desde celular:                      ║
║  192.168.40.64:3000                            ║
║                                                ║
║  💻 Servidor: http://localhost:3000            ║
╚════════════════════════════════════════════════╝
  `)
})
