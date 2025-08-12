const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require("cors");
const errorHandler = require('./middlewares/errorHandlers');
const authRoutes = require('./routes/authRoute');
const contactRoutes = require('./routes/contactRoute');
const blogRoutes = require('./routes/blogRoute');
const projectRoute = require('./routes/projectRoute');
const HeroBrandRoute = require('./routes/HeroBrandRoute');
const imageRoute = require('./routes/imageRoute');
const statRoute = require('./routes/statRoute');
const dashboardRoutes=require('./routes/dashboardRoute');

// Load env files
dotenv.config();

// Create express app 
const app = express();

// Middleware
app.use(cookieParser()); // First load cookies

// 👇 CORS configuration updated to allow your frontend URL
const allowedOrigins = ['http://localhost:5173', 'http://localhost:5174'];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true 
}));

app.use(express.json());

// Import routes BEFORE the error handler
app.use("/api/auth", authRoutes);
app.use("/api/contact", contactRoutes); 
app.use('/api/blog', blogRoutes);
app.use('/api/project', projectRoute);
app.use('/api/heroBrand', HeroBrandRoute);
app.use('/api/image', imageRoute);
app.use('/api/stat', statRoute); 
app.use('/api/dashboard',dashboardRoutes);

// Test route
app.get("/", (req, res) => {
    res.send("Krrivah CMS Backend is Running "); 
});

// Error middleware (should be loaded after routes)
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});