import express from 'express'
import { createPool } from 'mysql2/promise'
import { config } from 'dotenv'
import bodyParser from 'body-parser';
import cors from 'cors';

config()


const app = express();
app.use(bodyParser.json());

const whitelist = ["http://localhost:8080",
                    "http://127.0.0.1:8080"]
app.use(cors({
  origin: function(origin, callback){
    if (!origin) {
      return callback(null, true);
    }

    if (whitelist.includes(origin)) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }

}));


const pool = createPool({
    host: process.env.MYSQLDB_HOST,
    user: 'root',
    database: process.env.MYSQLDB_DATABASE,
    password:  process.env.MYSQLDB_ROOT_PASSWORD,
    port:  process.env.MYSQLDB_DOCKER_PORT
})


app.use((err, req, res, next) => {
    console.error(err.stack);
    
    res.status(500).send('Algo salió mal!');
  });
  

app.get('/', (req, res)=> {
    res.send('API está funcionando')
});

app.get('/usuarios', async (req, res, next)=> {
    try {
        const result = await pool.query('SELECT * FROM usuarios;');
        res.json(result[0]);
    } catch (err) {
        next(err); 
    }
});

app.get('/roles', async (req, res, next)=> {
    try {
        const result = await pool.query('SELECT * FROM roles;');
        res.json(result[0]);
    } catch (err) {
        next(err);
    }
});

app.post('/usuarios', async (req, res, next) => {
    try {
        const { nombre, apellido, email, password, rol_id } = req.body;
        const newUser = { nombre, apellido, email, password, rol_id };
        await pool.query('INSERT INTO usuarios SET ?', newUser);
        res.send('Usuario creado correctamente');
    } catch (err) {
        next(err);
    }
});

app.get('/imagenes', async (req, res, next)=> {
    try {
        const result = await pool.query('SELECT * FROM imagenes;');
        res.json(result[0]);
    } catch (err) {
        next(err);
    }
});



app.listen(3000)
console.log('Server on port', 3000)