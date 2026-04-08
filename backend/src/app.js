// import express from 'express';
// import cors from 'cors';
// import authRoutes from './routes/auth.routes.js';
// import productRoutes from './routes/product.routes.js';
// import cartRoutes from './routes/cart.routes.js';
// import orderRoutes from './routes/order.routes.js';
// import cookieParser from 'cookie-parser';
// import paymentRoutes from './routes/payment.routes.js';

// const app = express();
// app.use(cookieParser());

// const isProduction = process.env.NODE_ENV === 'production';
// if (!isProduction) {
//   console.log('You didnt hit production url');
// }

// app.use(
//   cors({
//     origin: isProduction
//       ? 'https://shoply-sage.vercel.app'
//       : ['http://localhost:5173', 'http://localhost:5174'],
//     credentials: true,
//   }),
// );
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use((req, res, next) => {
//   console.log('HIT:', req.method, req.url);
//   next();
// });

// app.use('/api/auth', authRoutes);
// app.use('/api/products', productRoutes);
// app.use('/api/cart', cartRoutes);
// app.use('/api/orders', orderRoutes);
// app.use('/api/payment', paymentRoutes);

// app.get('/', (req, res) => {
//   res.send('API is running...');
//   console.log('api is running..');
// });

// export default app;

// ====================== IMPORTS ======================
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

// Routes
import authRoutes from './routes/auth.routes.js';
import productRoutes from './routes/product.routes.js';
import cartRoutes from './routes/cart.routes.js';
import orderRoutes from './routes/order.routes.js';
import paymentRoutes from './routes/payment.routes.js';

// ====================== APP INIT ======================
const app = express();

// ====================== ENV ======================
const isProduction = process.env.NODE_ENV === 'production';

// ====================== MIDDLEWARE ======================

// Parse cookies (for JWT auth)
app.use(cookieParser());

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ====================== CORS CONFIG ======================

// Allowed frontend origins
const allowedOrigins = [
  'https://shoply-sage.vercel.app', // production frontend
  'http://localhost:5173', // local dev
  'http://localhost:5174', // local dev alt
];

// CORS options (dynamic origin check)
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like Postman)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('❌ Not allowed by CORS'));
    }
  },
  credentials: true, // allow cookies
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Handle preflight requests (VERY IMPORTANT)
// app.options('/*', cors(corsOptions));

// ====================== LOGGING ======================

// Simple request logger (use morgan in production if needed)
app.use((req, res, next) => {
  console.log(`🔥 ${req.method} ${req.url}`);
  next();
});

// ====================== ROUTES ======================

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payment', paymentRoutes);

// Health check route
app.get('/', (req, res) => {
  res.send('🚀 API is running...');
});

// ====================== ERROR HANDLER ======================

// Global error handler (important for debugging)
app.use((err, req, res, next) => {
  console.error('❌ ERROR:', err.message);

  res.status(500).json({
    message: err.message || 'Server Error',
  });
});

// ====================== EXPORT ======================
export default app;
