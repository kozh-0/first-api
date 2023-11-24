import express from 'express';

export const userRouter = express.Router();

userRouter.post('/login', (req, res) => {
    res.send('login msg!')
})
userRouter.post('/register', (req, res) => {
    res.send('registraton')
})
