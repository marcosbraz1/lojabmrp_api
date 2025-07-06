// src/middlewares/authMiddleware.ts (CORRIGIDO)
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

declare global {
  namespace Express {
    interface Request {
      user?: { id: number; username: string };
    }
  }
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    res.sendStatus(401); // Remova o 'return' aqui
    return; // Adicione um 'return;' simples para sair da função após enviar a resposta
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    // Para um ambiente real, você pode querer um tratamento de erro mais sofisticado aqui
    // ou garantir que JWT_SECRET seja sempre definido antes da aplicação iniciar.
    console.error('ERRO CRÍTICO: JWT_SECRET não está definido nas variáveis de ambiente.');
    res.sendStatus(500); // Envia um erro de servidor
    return; // Adicione um 'return;' simples para sair da função
  }

  jwt.verify(token, secret, (err: any, user: any) => {
    if (err) {
      console.error('Erro de verificação do JWT:', err);
      res.sendStatus(401); // Remova o 'return' aqui
      return; // Adicione um 'return;' simples para sair da função
    }
    req.user = user;
    next();
    // Não é necessário 'return' aqui, pois next() já passa o controle.
  });
};