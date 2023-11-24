import express from 'express'
import { userRouter } from './src/users.js';

const port = 5555
const app = express()

app.get('/hello', (req, res) => {
    console.log(res);
    res.send('AAAAAAA')
})

app.use('/users', userRouter)

app.listen(port, () => {
    console.log(`Server is up! on http://localhost:${port}`);
})