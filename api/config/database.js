require('dotenv').load();

const databaseCredentialsAndOptions = {
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT || 'mysql',
  ssl: false, // todo: conditionally enable in production
  dialectOptions: {
    ssl: undefined, // todo: conditionally set based on prod env/platform
  },
  // do not log sql to the console
  logging: false,
};

/**
 * despite us using environment variables for all of these...
 * sequelize-cli requires a config with different values for development, test, and production
 * the 'integration' export is for integration testing only. this is to allow refreshing of the db.
 */
module.exports = {
  development: databaseCredentialsAndOptions,
  test: databaseCredentialsAndOptions,
  production: databaseCredentialsAndOptions,
  integration: Object.assign({}, databaseCredentialsAndOptions, { database: 'integration' }),
};
