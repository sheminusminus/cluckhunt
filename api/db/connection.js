import Sequelize from 'sequelize';
import { database as DatabaseConfig } from './../config';

const config = DatabaseConfig[process.env.NODE_ENV || 'development'];
const sequelize = new Sequelize(config.database, config.username, config.password, config);

sequelize
  .authenticate()
  .then(() => {
    // TODO: logging util
    console.log('Database client connected successfully');
  })
  .catch((err) => {
    // TODO: logging util
    console.error('Database client failed to connect');
    console.error(err);
  });

export default sequelize;
