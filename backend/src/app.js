import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes.js';
import productRoutes from './routes/product.routes.js';
import cartRoutes from './routes/cart.routes.js';
import orderRoutes from './routes/order.routes.js';
import cookieParser from 'cookie-parser';
import paymentRoutes from './routes/payment.routes.js';

const app = express();
app.use(cookieParser());

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

const allowedOrigins = [
  'https://shoply-sage.vercel.app',
  'http://localhost:5173',
  'http://localhost:5174',
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
};

// ✅ Use ONLY this
app.use(cors(corsOptions));

// ✅ Preflight handler (CRITICAL)
app.options('*', cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  console.log('HIT:', req.method, req.url);
  next();
});

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payment', paymentRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
  console.log('api is running..');
});

export default app;
