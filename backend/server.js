import app from './app.js';
import { sequelize } from './models/index.js';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3001;

sequelize.authenticate()
  .then(() => console.log('DB connected'))
  .then(() => sequelize.sync())
  .then(() => app.listen(PORT, () => console.log(`Server running on ${PORT}`)))
  .catch(err => console.error(err));
