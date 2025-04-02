const User = require('../models/User');
const { generateToken } = require('../config/jwt');

// Kullanıcı kaydı
const register = async (req, res) => {
  try {
    const { username, email, password, firstName, lastName } = req.body;
    
    // Kullanıcı adı veya e-posta zaten var mı kontrol et
    const existingUser = await User.findOne({
      where: {
        [sequelize.Op.or]: [{ username }, { email }]
      }
    });
    
    if (existingUser) {
      return res.status(400).json({ message: 'Bu kullanıcı adı veya e-posta adresi zaten kullanılıyor' });
    }
    
    // Yeni kullanıcı oluştur
    const user = await User.create({
      username,
      email,
      password, // bcrypt hook şifreyi hashlıyor
      first_name: firstName,
      last_name: lastName,
      role: 'user' // Varsayılan rol
    });
    
    // Şifreyi yanıtta gösterme
    const userData = user.toJSON();
    delete userData.password;
    
    // Token oluştur
    const token = generateToken(user);
    
    res.status(201).json({
      message: 'Kullanıcı başarıyla oluşturuldu',
      user: userData,
      token
    });
  } catch (error) {
    console.error('Kullanıcı kaydı hatası:', error);
    res.status(500).json({ message: 'Sunucu hatası' });
  }
};

// Kullanıcı girişi
const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Kullanıcıyı bul
    const user = await User.findOne({
      where: {
        [sequelize.Op.or]: [
          { username },
          { email: username } // E-posta ile de giriş yapılabilir
        ]
      }
    });
    
    if (!user) {
      return res.status(401).json({ message: 'Geçersiz kullanıcı adı veya şifre' });
    }
    
    // Şifreyi kontrol et
    const isPasswordValid = await user.checkPassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Geçersiz kullanıcı adı veya şifre' });
    }
    
    // Kullanıcı aktif mi kontrol et
    if (!user.is_active) {
      return res.status(401).json({ message: 'Hesabınız devre dışı bırakılmış' });
    }
    
    // Şifreyi yanıtta gösterme
    const userData = user.toJSON();
    delete userData.password;
    
    // Token oluştur
    const token = generateToken(user);
    
    res.json({
      message: 'Giriş başarılı',
      user: userData,
      token
    });
  } catch (error) {
    console.error('Giriş hatası:', error);
    res.status(500).json({ message: 'Sunucu hatası' });
  }
};

// Kullanıcı profili
const getProfile = async (req, res) => {
  try {
    // req.user middleware tarafından sağlanıyor
    const userData = req.user.toJSON();
    delete userData.password;
    
    res.json({
      user: userData
    });
  } catch (error) {
    console.error('Profil getirme hatası:', error);
    res.status(500).json({ message: 'Sunucu hatası' });
  }
};

module.exports = {
  register,
  login,
  getProfile
};
