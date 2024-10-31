import express from 'express';
const app = express();

app.get('/', (req, res) => {
    res.send('Hello from Express!');
});

app.get('/test', (req, res) => {
    res.send('Test route is working!');
});

export default app;
