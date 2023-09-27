/* packages */
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const { DB_NAME, DATABASE_URL } = process.env;
const userModal = require('../app/models/user.model');

const url = DATABASE_URL || `mongodb://127.0.0.1:27017/${DB_NAME}`;

// DB Connection Start
mongoose.set('strictQuery', false);
mongoose.Promise = global.Promise;
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    const password = 'Admin@12345';

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    // admin 1
    const admin1 = {
      firstName: 'Admin',
      lastName: '1',
      email: 'admin1@mailinator.com',
      role: 'admin',
      password: hash,
    };

    // admin 2
    const admin2 = {
      firstName: 'Admin',
      lastName: '2',
      email: 'admin2@mailinator.com',
      role: 'admin',
      password: hash,
    };

    // check if admin already exists
    const admin1IsExist = await userModal.findOne({ email: admin1.email });
    const admin2IsExist = await userModal.findOne({ email: admin2.email });

    if (!admin1IsExist) {
      await userModal.create(admin1);
    }

    if (!admin2IsExist) {
      await userModal.create(admin2);
    }
  })
  .catch(err => console.log(err));
