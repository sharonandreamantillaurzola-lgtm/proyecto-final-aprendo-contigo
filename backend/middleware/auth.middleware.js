import jwt from 'jsonwebtoken';

export const requireAuth = (req, res, next) => {
    const header = req.headers.authorization;
    const token = header?.startsWith('Bearer ') ? header.slice(7) : null;

    if (!token) {
        return res.status(401).json({ message: 'Token requerido' });
    }

    if (!process.env.JWT_SECRET) {
        return res.status(500).json({ message: 'JWT_SECRET no está configurado' });
    }

    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch {
        res.status(401).json({ message: 'Token inválido o expirado' });
    }
};

export const requireSameUser = (req, res, next) => {
    if (req.user.id !== req.params.id) {
        return res.status(403).json({ message: 'No puedes modificar otro usuario' });
    }

    next();
};

export const requireAdmin = (req, res, next) => {
    if (req.user.rol !== 'admin') {
        return res.status(403).json({ message: 'Se requieren permisos de administrador' });
    }

    next();
};