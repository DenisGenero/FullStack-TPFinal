require('dotenv').config();
const express = require('express');
const path = require('path');
const hbs = require ('hbs');
const mysql = require('mysql');

const app = express();
const port = process.env.PORT;

// handlebars
app.set ('view engine', 'hbs')
// PROBANDO P CONECTAR
app.set('views', path.join(__dirname,'views'));

// contenido estático
app.use(express.static('public'))
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//Contenido dinámico
hbs.registerPartials(__dirname + "/views/partials/")

// Conexión a la base de datos:
const conn = mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'',
  database:'genero_denis'
})
conn.connect((err) => {
  if(err) throw err
  console.log('Conexion establecida...')
});

//Ver suscriptores
app.get("/admin", (req, res) => {
  let sql = "SELECT * FROM suscriptores";
  let query = conn.query(sql, (err, results) => {
     if (err) throw err;
     res.render("admin", {
        results: results,
     });
    //  res.send(results);
  });
});

//Agregar suscriptor
app.post('/save', (req, res) => {
  let data = {nombre: req.body.nombre, apellido: req.body.apellido, edad: req.body.edad, mail: req.body.mail};
  let sql = "INSERT INTO suscriptores SET ?";
  let query = conn.query(sql, data, (err, results) => {
      if (err) throw err;
      res.redirect('/formulario');
  });
});

app.get('/', function(req, res) {
  res.render("index")
});

app.get('/index', function(req, res) {
  res.render("index")
});

app.get('/contacto', function(req, res) {
  res.render("contacto")
});

app.get('/historia', function(req,res) {
  res.render('historia')
})

app.get('/frances', function(req, res) {
  res.render('idiomas/frances')
})

app.get('/ingles', function(req, res) {
  res.render('idiomas/ingles')
})

app.get('/italiano', function(req, res) {
  res.render('idiomas/italiano')
})

app.get('/portugues', function(req, res) {
  res.render('idiomas/portugues')
})

app.get('/formulario', function(req, res) {
  res.render('formulario')
})

app.get('/admin', function(req, res) {
  res.render('admin')
})



// })
// app.get('/contacto', (req, res) => {
//     res.sendFile(__dirname+"/public/contacto.html");
//   })
//   app.get('/tienda', (req, res) => {
//     res.sendFile(__dirname+"/public/tienda.html");
//   })  
//   app.get('*', (req, res) => {
//     res.send('404')
//   })
app.listen(port, () => {console.log(`Usando el puerto http://localhost:${port}`)})