import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const isAuth = (req: Request, res: Response, next: NextFunction): void => {
  let token = req.cookies.t;

  if (!token) {
    return res.status(401).json({
      message: 'No token, authorization denied',
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    req.userId = decoded._id;

  } catch (error) {
    return res.status(401).json({ message: 'Token is not valid' });
  }

  next();
};

export default isAuth;