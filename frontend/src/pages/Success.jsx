import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import toast from 'react-hot-toast';
import { CheckCircle } from 'lucide-react';

const Success = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [done, setDone] = useState(false);

  const orderId = params.get('orderId');

  // useEffect(() => {
  //   const confirmPayment = async () => {
  //     try {
  //       await axios.post('/payment/confirm-payment', {
  //         orderId,
  //       });

  //       setLoading(false);
  //       setDone(true);

  //       toast.success('Payment successful 🎉');

  //       // ⏳ Redirect after animation
  //       setTimeout(() => {
  //         navigate('/orders');
  //       }, 2500);
  //     } catch (error) {
  //       setLoading(false);
  //       toast.error('Payment verification failed');
  //     }
  //   };

  //   if (orderId) confirmPayment();
  // }, []);

  useEffect(() => {
    let interval;

    const checkPaymentStatus = async () => {
      try {
        const { data } = await axios.get(`/orders/${orderId}`);

        if (data.status === 'paid') {
          setLoading(false);
          setDone(true);

          toast.success('Payment successful 🎉');

          clearInterval(interval);

          setTimeout(() => {
            navigate('/orders');
          }, 2500);
        }
      } catch (error) {
        setLoading(false);
        toast.error('Something went wrong', error.message);
      }
    };

    if (orderId) {
      // 🔁 Poll every 2 sec (because webhook takes time)
      interval = setInterval(checkPaymentStatus, 2000);
    }

    return () => clearInterval(interval);
  }, [orderId]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-950 text-white">
      {/* ⏳ LOADING */}
      {loading && (
        <div className="flex flex-col items-center gap-4">
          {/* Spinner */}
          <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>

          <p className="text-gray-400 text-sm">Verifying your payment...</p>
        </div>
      )}

      {/* 🎉 SUCCESS */}
      {done && (
        <div className="flex flex-col items-center gap-4 text-center">
          {/* Animated Check */}
          <CheckCircle className="w-20 h-20 text-green-400 animate-bounce" />

          <h1 className="text-2xl font-bold">Payment Successful 🎉</h1>

          <p className="text-gray-400 text-sm">
            Your order has been placed successfully.
          </p>

          <p className="text-xs text-gray-500">Redirecting to your orders...</p>
        </div>
      )}
    </div>
  );
};

export default Success;
