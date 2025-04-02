const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticate } = require('../middlewares/authMiddleware');
const validationMiddleware = require('../middlewares/validationMiddleware');

// Kullanıcı kaydı için validasyon
const registerValidation = [
  body('username')
    .isLength({ min: 3, max: 50 })
    .withMessage('Kullanıcı adı 3-50 karakter uzunluğunda olmalıdır')
    .isAlphanumeric()
    .withMessage('Kullanıcı adı yalnızca harf ve rakam içerebilir'),
  body('email')
    .isEmail()
    .withMessage('Geçerli bir e-posta adresi giriniz')
    .normalizeEmail(),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Şifre en az 6 karakter olmalıdır'),
  body('firstName')
    .optional()
    .isLength({ max: 50 })
    .withMessage('Ad en fazla 50 karakter olabilir'),
  body('lastName')
    .optional()
    .isLength({ max: 50 })
    .withMessage('Soyad en fazla 50 karakter olabilir')
];

// Giriş için validasyon
const loginValidation = [
  body('username')
    .notEmpty()
    .withMessage('Kullanıcı adı veya e-posta gereklidir'),
  body('password')
    .notEmpty()
    .withMessage('Şifre gereklidir')
];

// Rotalandırma
router.post('/register', registerValidation, validationMiddleware, authController.register);
router.post('/login', loginValidation, validationMiddleware, authController.login);
router.get('/profile', authenticate, authController.getProfile);

module.exports = router;
