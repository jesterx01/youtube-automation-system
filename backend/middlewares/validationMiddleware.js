const { validationResult } = require('express-validator');

// Validasyon hatalarını kontrol eden middleware
const validationMiddleware = (req, res, next) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: 'Geçersiz giriş verileri',
      errors: errors.array()
    });
  }
  
  next();
};

module.exports = validationMiddleware;
