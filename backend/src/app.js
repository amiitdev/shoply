import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes.js';
import productRoutes from './routes/product.routes.js';
import cartRoutes from './routes/cart.routes.js';
import orderRoutes from './routes/order.routes.js';
import cookieParser from 'cookie-parser';
import paymentRoutes from './routes/payment.routes.js';
import webhookRoutes from './routes/webhook.route.js';

const app = express();
app.use(cookieParser());

const allowedOrigins = [
  'https://shoply-sage.vercel.app',
  'http://localhost:5173',
  'http://localhost:5174',
];

const corsOptions = {
  origin: allowedOrigins,
  credentials: true,
};

app.use('/api/webhook', webhookRoutes);

app.use(cors(corsOptions));

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
