import express from 'express';
const app = express();

app.use(express.static('assets'));
let users = {
  "usuarios": [
    "marley",
    "brandy",
    "bala",
    "baco",
    "armin",
    "rolito"
  ]
}

app.get('/abracadabra/usuarios', (req, res) => {
  res.json(users);
});

app.get("/abracadabra/juego/:usuario", 
(req, res, next) => {
    let usuario = users.usuarios.find(user => user == req.params.usuario.toLowerCase());
    usuario ? next() : res.sendFile('./assets/who.jpeg', {root: '.'}); 
  }, 
  (req, res) => {
    res.sendFile('index.html', {root: '.'})
});


app.get("/abracadabra/conejo/:n", (req, res) => {
  let n = Math.floor(Math.random() * 4 + 1).toString();
  n === req.params.n ? res.sendFile('./assets/conejito.jpg', {root: '.'}) : res.sendFile('./assets/voldemort.jpg', {root: '.'})

});

app.get('/*', (req, res) => {
  res.status(404).send('Esta pagina no existe')
})
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server runnig: http//localhost:${PORT}`);
});