const express = require('express');
const app = express();

app.use(express.json());

// Define your routes here
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'OK' ,
        message: 'DevDesk API funcionando!'
    });
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});