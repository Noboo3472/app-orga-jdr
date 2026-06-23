import express from "express"
import authRoute from './src/Routes/authRoutes.js'

const app = express();

const port = 3000;

app.get('/', (req, res) =>{
    res.send('Hello World !');
});

app.listen(port,()=>{
    console.log(`test sur le port ${port}`);
});

app.use(express.json({
  verify: (req, res, buf) => {
    console.log('RAW BODY =>', buf.toString());
    console.log('CONTENT-TYPE =>', req.headers['content-type']);
  }
}));

app.use('/auth', authRoute)