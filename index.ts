import express, { Request, Response, NextFunction} from 'express';
import { userRouter } from './users/users.js';

const port = 8000;
// Это приложение в котором указываем роуты и создаем сервер
const app = express();

// обработчик всего приложения
app.use((req, res, next) => {
    console.log(`Время ${Date.now()}`);
    next();
});

interface Kek {
    lol: string;
    kek: number
}
// get типизирован и знает, что такое req, res
app.get('/hello', (req, res) => {
    res.status(404).end();
});
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log(err.message);
    res.status(401).send(err.message);
});

app.use('/users', userRouter)

app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});