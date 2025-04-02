const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('../user-service/routes/userRoutes');
const investmentRoutes = require('../investment-service/routes/investmentRoutes');
const transactionRoutes = require('../transaction-service/routes/transactionRoutes');
const complianceRoutes = require('../compliance-service/routes/complianceRoutes');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/user', userRoutes);
app.use('/api/investment', investmentRoutes);
app.use('/api/transaction', transactionRoutes);
app.use('/api/compliance', complianceRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
