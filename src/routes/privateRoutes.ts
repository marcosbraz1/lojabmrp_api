// src/routes/privateRoutes.ts
import { Router, Request, Response } from 'express';
import { authenticateToken } from '../middlewares/authMiddleware';

const router = Router();

router.use(authenticateToken);

router.get('/dashboard', (req: Request, res: Response) => {
  res.json({ message: `Bem-vindo ao dashboard, ${req.user?.username}!`, user: req.user });
});

router.get('/profile', (req: Request, res: Response) => {
  res.json({ message: 'Esta é sua página de perfil privada.', user: req.user });
});

export default router;