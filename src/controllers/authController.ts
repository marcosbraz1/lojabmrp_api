// src/controllers/authController.ts
import { Request, Response, type RequestHandler } from 'express';
import jwt from 'jsonwebtoken';

const users = [
  { id: 1, username: 'testuser', password: 'password123' }
];

export const login = (req: Request, res: Response) => {
    try {
        const { username, password } = req.body!;

        if(!username) {
            res.status(401).json({ message: 'Usuario nao enviado' });
            return;
        }
        if(!password) {
            res.status(401).json({ message: 'Usuario nao enviado' });
            return;
        }
    
        const user = users.find(u => u.username === username && u.password === password);
    
        if (!user) {
        res.status(401).json({ message: 'Credenciais inválidas' });
        return; 
        }
    
        const secret = process.env.JWT_SECRET;
        if (!secret) {
        console.error("ERRO: JWT_SECRET não está definido nas variáveis de ambiente.");
        res.status(500).json({ message: 'Erro interno do servidor: Chave secreta não configurada.' });
        return; 
        }
    
        const token = jwt.sign({ id: user.id, username: user.username }, secret, { expiresIn: '1h' });
    
        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: 'Usuario ou senha nao enviados!' });

    }
    
  };