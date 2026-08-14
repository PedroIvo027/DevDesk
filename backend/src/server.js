const express = require('express');
const sequelize = require('./config/database.js');

const app = express();

app.use(express.json());

app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'OK' ,
        message: 'DevDesk API funcionando!'
    });
});

const PORT = 3000;

async function startServer() {
    try {
        await sequelize.authenticate();
        console.log('Conexão com o banco de dados estabelecida com sucesso.');

        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`);
        });
    } catch (error) {
        console.error('Não foi possível conectar ao banco de dados:');
        console.error(error.message);
    }
}

startServer();