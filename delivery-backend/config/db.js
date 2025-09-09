const mongoose = require('mongoose');
let MongoMemoryServer;

const startInMemoryMongo = async () => {
  try {
    // Lazy-load to avoid requiring this in production if unnecessary
    ({ MongoMemoryServer } = require('mongodb-memory-server'));
  } catch (err) {
    console.error('❌ Failed to load mongodb-memory-server. Set MONGO_URI or add dev dependency.');
    throw err;
  }

  const mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();
  const conn = await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log(`✅ In-memory MongoDB started at ${uri}`);
  return conn;
};

const connectDB = async () => {
  const configuredUri = process.env.MONGO_URI || 'mongodb://localhost:27017/cargo-stream';

  // If MONGO_URI is provided, attempt to connect first; otherwise use in-memory
  if (process.env.MONGO_URI) {
    try {
      const conn = await mongoose.connect(configuredUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log(`✅ MongoDB connected: ${conn.connection.host}`);
      return;
    } catch (error) {
      console.warn('⚠️ MongoDB connection failed, falling back to in-memory instance:', error.message);
    }
  }

  try {
    await startInMemoryMongo();
  } catch (error) {
    console.error('❌ Failed to start in-memory MongoDB:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
