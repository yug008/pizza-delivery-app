import Admin from '../models/Admin.js';

const seedAdmin = async () => {
  const adminExists = await Admin.findOne({ email: 'admin@pizza.com' });

  if (!adminExists) {
    await Admin.create({
      name: 'Admin',
      email: 'admin@pizza.com',
      password: 'admin123',
    });
    console.log('Default admin account seeded: admin@pizza.com');
  }
};

export default seedAdmin;
