const express = require('express')
const app = express()
const PORT = 5005

app.use(express.json())
app.use(express.static('public')) // This overwrites any GET request made to '/'
app.use(require('cors')())

function mw (req, res, next) {
  console.log("hello")
  const { id } = req.params
  console.log(id)
  if (id != 8) {
    return res.sendStatus(403)
  }
  next()
}

// const db = []

// function cron (ms, fn) {
//   async function cb () {
//     clearTimeout(timeout)
//     await fn()
//     timeout = setTimeout(cb, ms)
//   }
//   let timeout = setTimeout(cb, ms)
//   return () => { }
// }

// function consoleDB() {
//   console.log('DB: ', db)
// }

// cron(1000, consoleDB)


// http://127.0.0.1/

app.get('/', (req, res) => {
  // res.status(200).send('You have reached the homepage: GET')
  res.status(200).json({
    message: 'You have reached the homepage: GET'
  })
})

app.get('/html', (req, res) => {
  res.send('<h1>Hello World</h1>')
})

app.delete('/', (req, res) => {
  console.log("you did it after the mw")
  res.sendStatus(200)
})

app.post('/api/info', (req, res) => {
  const { information } = req.body
  db.push(information)
  res.status(200).json({
    "message": information
  })
})

app.put('/api', (req, res) => {
  const { word, banana } = req.query
  console.log(word, banana)
  res.status(200).json({
    "message": word + " " + banana
  })
})


app.delete('/delete/:id/:name', (req, res) => {
  const { id, name } = req.params
  res.status(200).json({
    "message": id + " " + name
  })
})

// protecting delete endpoint with middleware below

app.delete('/api/delete/:id', mw, (req, res) => {
  const { id } = req.params
  res.status(200).json({ "message": "successfully deleted " + id})
})


app.listen(PORT, () => {console.log(`Server has started on port: ${PORT}`)})