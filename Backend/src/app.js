import express from 'express'
import router from './routes/ai.routes.js';
const app = express()


app.get('/',(req,resp)=>{
    resp.send("Server is created");
})

app.use('/ai',router);


export default app;