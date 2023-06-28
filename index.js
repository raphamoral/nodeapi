const express = require('express');
require('dotenv/config');

// Local Modules
const productsAPIRoute = require('./routes/routeAPI');

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Default MIDDLEWARES
app.use('/',(req, res, next)=>{
  console.log(new Date().toLocaleString(), req.method, req.url);
  next();
});

app.get('/', (req, res) => {
  res.redirect('/docs');
})

// SET views
app.set('view engine', 'ejs');
app.set('views', './views');
app.get('/docs', (req, res) => {
    res.render('index');
})

// API - Routes 
app.use('/api', productsAPIRoute);

// 404 handler
app.use((req, res) => {
  return res.status(404).send('recurso não existe');
});

// Starting server
app.listen(port, (err) =>{
  if(!err)
      console.log(`Server is Successfully Running, and App is listening on port ${port}`)
  else 
      console.log("Error occurred, server can't start", err);
  }
);