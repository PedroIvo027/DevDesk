const express = require('express');
const sequelize = require('./config/database.js');
const User = require('./models/user.js');
const authRoutes = require('./routes/authRoutes.js');
const Ticket = require('./models/ticket');
const ticketRoutes = require('./routes/ticketRoutes');

const app = express();

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/tickets', ticketRoutes);

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

        User.hasMany(Ticket, {
            foreignKey: 'userId'
        });

        Ticket.belongsTo(User, {
             foreignKey: 'userId'
        });

         await sequelize.sync();
        console.log('Tabelas sincronizadas.');

        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`);
        });
    } catch (error) {
        console.error('Não foi possível conectar ao banco de dados:');
        console.error(error.message);
    }
}

startServer();