const express = require('express')
const fs = require('fs')
const path = require('path')
const cors = require('cors')

const app = express()
const PORT = process.env.PORT || 3000
const dataFile = path.join(__dirname, 'data', 'productos.json')

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
  const newProduct = {
    id: nextId,
    ...req.body
  }
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

app.get('/', (req, res) => {
  res.send({ status: 'ok' })
})

app.listen(PORT, () => {
  console.log(`Backend de productos escuchando en http://localhost:${PORT}`)
})
