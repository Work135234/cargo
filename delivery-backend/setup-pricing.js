const mongoose = require('mongoose');
const PricingRule = require('./models/PricingRule');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/cargo-stream', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function setupPricingRules() {
  try {
    console.log('Setting up pricing rules...');

    // Check if pricing rules exist
    const existingRules = await PricingRule.find();
    
    if (existingRules.length === 0) {
      // Create default pricing rules
      const defaultRules = [
        {
          modeOfTransport: 'truck',
          baseFare: 50,
          perKmRate: 2.5,
          perKgRate: 0.15,
          isActive: true
        },
        {
          modeOfTransport: 'train',
          baseFare: 30,
          perKmRate: 1.8,
          perKgRate: 0.10,
          isActive: true
        }
      ];

      await PricingRule.insertMany(defaultRules);
      console.log('✅ Default pricing rules created successfully');
    } else {
      console.log('✅ Pricing rules already exist');
    }

    // Display current rules
    const rules = await PricingRule.find({ isActive: true });
    console.log('\nCurrent pricing rules:');
    rules.forEach(rule => {
      console.log(`${rule.modeOfTransport}: Base $${rule.baseFare}, $${rule.perKmRate}/km, $${rule.perKgRate}/kg`);
    });

  } catch (error) {
    console.error('❌ Error setting up pricing rules:', error);
  } finally {
    mongoose.connection.close();
  }
}

setupPricingRules();
