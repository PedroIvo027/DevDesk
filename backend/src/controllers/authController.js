const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

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
                message: 'Este email já está cadastrado.' 
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

const login = async (req, res) => {
    try {
        const { email, password } = req.body;   

        if(!email || !password) {
            return res.status(400).json({ 
                message: 'Email e senha são obrigatórios.' 
            });
        }

        const user = await User.findOne({ 
            where: { email }
        });
    
        if (!user) {
            return res.status(401).json({ 
                message: 'Email ou senha inválidos.' 
            });
        }
        
        const passwordMatch = await bcrypt.compare(
            password, 
            user.password
        );

        if (!passwordMatch) {
            return res.status(401).json({ 
                message: 'Email ou senha inválidos.' 
            });
        }

        const token = jwt.sign(
            { 
                id: user.id, 
                email: user.email,
                role: user.role 
            }, 
            process.env.JWT_SECRET, 
            { 
                expiresIn: process.env.JWT_EXPIRES_IN
            }
        );

        return res.status(200).json({
            message: 'Login bem-sucedido.',
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        console.error('Erro ao fazer login:', error);
        return res.status(500).json({
            message: 'Erro interno do servidor.'
        });
    }
};

    module.exports = {
    register,
    login
};