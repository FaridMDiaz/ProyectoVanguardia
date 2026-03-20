const express = require('express')
const fs = require('fs')
const path = require('path')
const cors = require('cors')
const bcrypt = require('bcrypt')

const app = express()
const PORT = process.env.PORT || 3000
const dataFile = path.join(__dirname, 'data', 'productos.json')
const usersFile = path.join(__dirname, 'data', 'users.json')

app.use(cors())
app.use(express.json())
app.use('/private', express.static(path.join(__dirname, 'private')))

const ensureDataFile = () => {
  const dir = path.dirname(dataFile)
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
  if (!fs.existsSync(dataFile)) fs.writeFileSync(dataFile, JSON.stringify([], null, 2))
}

const readProducts = () => {
  ensureDataFile()
  const json = fs.readFileSync(dataFile, 'utf-8')
  return JSON.parse(json || '[]')
}

const saveProducts = (products) => {
  ensureDataFile()
  fs.writeFileSync(dataFile, JSON.stringify(products, null, 2))
}

const readUsers = () => {
  if (!fs.existsSync(usersFile)) fs.writeFileSync(usersFile, JSON.stringify([], null, 2))
  return JSON.parse(fs.readFileSync(usersFile, 'utf-8') || '[]')
}

const saveUsers = (users) => {
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2))
}

// Productos
app.get('/productos', (req, res) => {
  const productos = readProducts()
  res.json(productos)
})

app.get('/productos/:id', (req, res) => {
  const productos = readProducts()
  const product = productos.find(p => String(p.id) === String(req.params.id))
  if (!product) return res.status(404).json({ message: 'Producto no encontrado' })
  res.json(product)
})

app.post('/productos', (req, res) => {
  const productos = readProducts()
  const nextId = productos.length ? Math.max(...productos.map(p => Number(p.id) || 0)) + 1 : 1
  const newProduct = { id: nextId, ...req.body }
  productos.push(newProduct)
  saveProducts(productos)
  res.status(201).json(newProduct)
})

app.put('/productos/:id', (req, res) => {
  const productos = readProducts()
  const index = productos.findIndex(p => String(p.id) === String(req.params.id))
  if (index === -1) return res.status(404).json({ message: 'Producto no encontrado' })
  productos[index] = { ...productos[index], ...req.body, id: productos[index].id }
  saveProducts(productos)
  res.json(productos[index])
})

app.delete('/productos/:id', (req, res) => {
  const productos = readProducts()
  const index = productos.findIndex(p => String(p.id) === String(req.params.id))
  if (index === -1) return res.status(404).json({ message: 'Producto no encontrado' })
  const deleted = productos.splice(index, 1)[0]
  saveProducts(productos)
  res.json(deleted)
})

// Auth
app.post('/auth/login', async (req, res) => {
  const { username, password } = req.body
  const users = readUsers()
  const user = users.find(u => u.username === username)
  if (!user) return res.status(401).json({ message: 'Usuario no encontrado' })
  const valid = await bcrypt.compare(password, user.password)
  if (!valid) return res.status(401).json({ message: 'Contraseña incorrecta' })
  res.json({ message: 'ok', username: user.username })
})

app.post('/auth/register', async (req, res) => {
  const { username, password } = req.body
  const users = readUsers()
  if (users.find(u => u.username === username)) {
    return res.status(400).json({ message: 'El usuario ya existe' })
  }
  const hashed = await bcrypt.hash(password, 10)
  users.push({ username, password: hashed })
  saveUsers(users)
  res.status(201).json({ message: 'Usuario creado', username })
})

app.get('/', (req, res) => {
  res.send({ status: 'ok' })
})

app.listen(PORT, () => {
  console.log(`Backend de productos escuchando en http://localhost:${PORT}`)
})