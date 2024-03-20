const cron = require('node-cron');
const mongoose = require('mongoose');
const Message = require('../models/Message');

// Connect to MongoDB (reuse the logic from server.js for consistency)
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Database connected successfully for scheduled task'))
  .catch(err => {
    console.error('Database connection error for scheduled task:', err.message);
    console.error(err.stack);
  });

// Scheduled task to run every day at midnight ('0 0 * * *')
cron.schedule('0 0 * * *', async () => {
  const thirtyDaysAgo = new Date(new Date().setDate(new Date().getDate() - 30));

  try {
    const result = await Message.deleteMany({
      timestamp: { $lt: thirtyDaysAgo }
    });

    console.log(`Scheduled task completed. Messages deleted: ${result.deletedCount}`);
  } catch (error) {
    console.error('Error during scheduled deletion of old messages:', error.message);
    console.error(error.stack);
  }
}, {
  scheduled: true,
  timezone: "Etc/UTC"
});