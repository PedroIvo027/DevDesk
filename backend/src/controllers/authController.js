const bcrypt = require('bcrypt');
const User = require('../models/user');

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if(!name || !email || !password) {
            return res.status(400).json({ 
                message: 'Todos os campos são obrigatórios.' 
            });
        }

        const existingUser = await User.findOne({ 
            where: { email }
        });

        if (existingUser) {
            return res.status(409).json({ 
                message: 'Este email já está em cadastrado.' 
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword
        });

         return res.status(201).json({ 
            message: 'Usuário criado com sucesso.', 
            user: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role
            }
        });

    } catch (error) {
        console.error('Erro ao registrar usuário:', error);

        return res.status(500).json({
             message: 'Erro interno do servidor.' 
     });
    }
};

module.exports = {
    register
};