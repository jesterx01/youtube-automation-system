const { verifyToken } = require('../config/jwt');
const User = require('../models/User');

// Token doğrulama middleware'i
const authenticate = async (req, res, next) => {
  try {
    // Token'ı al
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Yetkilendirme hatası: Token bulunamadı' });
    }

    const token = authHeader.split(' ')[1];
    
    // Token'ı doğrula
    const decoded = verifyToken(token);
    
    // Kullanıcıyı bul
    const user = await User.findByPk(decoded.id);
    if (!user || !user.is_active) {
      return res.status(401).json({ message: 'Yetkilendirme hatası: Kullanıcı bulunamadı veya aktif değil' });
    }
    
    // Kullanıcı bilgisini isteğe ekle
    req.user = user;
    
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Yetkilendirme hatası: Geçersiz token' });
  }
};

// Rol bazlı yetkilendirme middleware'i
const authorize = (roles = []) => {
  if (typeof roles === 'string') {
    roles = [roles];
  }
  
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Yetkilendirme hatası: Kullanıcı bilgisi bulunamadı' });
    }
    
    if (roles.length && !roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Yetkilendirme hatası: Yeterli izniniz yok' });
    }
    
    next();
  };
};

module.exports = {
  authenticate,
  authorize
};
