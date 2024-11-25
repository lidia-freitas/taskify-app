import pg from 'pg';

const client = new pg.Client({ connectionString: process.env.DB_CONN });

const connectDB = async () => {
  try {
    await client.connect();
    console.log('🟢 Database connected');
  } catch (error) {
    console.error('📛 Database connection failed', error);
    process.exit(1);
  }
};

const disconnectDB = async () => {
  try {
    await client.end();
    console.log('🟥️ Database disconnected');
  } catch (error) {
    console.error('📛 Database disconnection failed', error);
  }
};

export { client, connectDB, disconnectDB };
