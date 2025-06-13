import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { deleteItem, resetCart, incrementQuantity, decrementQuantity } from '../redux/HabeshaSlice';
import emptyCart from '../assets/images/emptyCart.png';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Cart = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.habesha.cartProducts);
  const language = useSelector((state) => state.habesha.language);
  const [totalPrice, setTotalPrice] = useState(0);

  const text = {
    EN: {
      shoppingCart: 'Shopping Cart',
      subtitle: 'Subtitle',
      unitPrice: 'Unit Price',
      qty: 'Qty',
      deleteItem: 'Delete Item',
      clearCart: 'Clear Cart',
      freeShipping: 'Your order qualifies for free shipping. Choose this option at checkout. See details...',
      total: 'Total',
      proceedToPay: 'Proceed to Pay',
      emptyCart: 'Your Cart is Empty',
      emptyCartMessage: 'Your shopping cart lives to serve. Give it purpose.',
      continueShopping: 'Continue Shopping',
    },
    AMH: {
      shoppingCart: 'የግብይት ጋሪ',
      subtitle: 'ንዑስ ርዕስ',
      unitPrice: 'ነጠላ ዋጋ',
      qty: 'ብዛት',
      deleteItem: 'እቃ ሰርዝ',
      clearCart: 'ጋሪ አጽዳ',
      freeShipping: 'ትዕዛዝህ ለነጻ መላኪያ ተስማሚ ነው። ይህን አማራጭ በመክፈቻ ጊዜ ምረጥ። ዝርዝሮችን ተመልከት...',
      total: 'ጠቅላላ',
      proceedToPay: 'መክፈል ቀጥል',
      emptyCart: 'ጋሪህ ባዶ ነው',
      emptyCartMessage: 'የግብይት ጋሪህ ለማገልገል ነው። ዓላማ ስጠው።',
      continueShopping: 'ግብይት ቀጥል',
    },
  };

  const currentText = text[language];

  const USD_TO_ETB_RATE = 120;

  const getDisplayPrice = useCallback(
    (price) => {
      return language === 'EN' ? price : price * USD_TO_ETB_RATE;
    },
    [language]
  );

  useEffect(() => {
    let Total = 0;
    products.forEach((item) => {
      Total += item.price * item.quantity;
    });
    setTotalPrice(getDisplayPrice(Total).toFixed(2));
  }, [products, language, getDisplayPrice]);

  return (
    <div className="w-full min-h-screen bg-gray-100 p-2 xs:p-4 sm:p-6">
      {products.length > 0 ? (
        <div className="max-w-[container] mx-auto grid grid-cols-1 md:grid-cols-5 gap-4 xs:gap-6 sm:gap-8">
          {/* Cart Items */}
          <div className="w-full bg-habesha_white p-2 xs:p-4 col-span-1 md:col-span-4 rounded-md">
            <div className="font-titleFont flex items-center justify-between border-b border-gray-400 py-2 xs:py-3">
              <h2 className="text-xl xs:text-2xl sm:text-3xl font-medium text-habesha_blue">
                {currentText.shoppingCart}
              </h2>
              <h4 className="text-lg xs:text-xl font-normal text-habesha_blue">{currentText.subtitle}</h4>
            </div>

            <div>
              {products.map((item) => (
                <div
                  key={item.id}
                  className="w-full border-b border-gray-300 p-2 xs:p-4 flex flex-col sm:flex-row items-center gap-4 xs:gap-6"
                >
                  <div className="w-full sm:w-1/5">
                    <img
                      className="w-full h-32 xs:h-36 sm:h-40 object-contain"
                      src={item.image}
                      alt="productImage"
                    />
                  </div>
                  <div className="w-full sm:w-4/5 flex flex-col gap-2 xs:gap-3">
                    <h2 className="font-semibold text-base xs:text-lg text-habesha_blue">{item.title}</h2>
                    <p className="text-xs xs:text-sm text-gray-600">
                      {item.description.substring(0, 100)}...
                    </p>
                    <p className="text-sm xs:text-base text-habesha_blue">
                      {currentText.unitPrice}{' '}
                      <span className="font-semibold">
                        {language === 'EN' ? '$' : 'ETB '}
                        {getDisplayPrice(item.price)}
                      </span>
                    </p>

                    <div className="bg-quantity_box flex justify-start items-center gap-2 w-28 xs:w-32 py-1 px-2 text-center rounded-md">
                      <p className="text-xs xs:text-sm">{currentText.qty}</p>
                      <button
                        onClick={() => dispatch(decrementQuantity(item.id))}
                        className="cursor-pointer bg-gray-200 px-2 py-1 rounded-md hover:bg-gray-400 duration-300"
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <p className="text-xs xs:text-sm">{item.quantity}</p>
                      <button
                        onClick={() => dispatch(incrementQuantity(item.id))}
                        className="cursor-pointer bg-gray-200 px-2 py-1 rounded-md hover:bg-gray-400 duration-300"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => dispatch(deleteItem(item.id))}
                      className="bg-red-500 w-32 xs:w-36 py-1 xs:py-2 rounded-lg text-habesha_white text-sm xs:text-base mt-2 hover:bg-red-700 active:bg-red-900 duration-300"
                    >
                      {currentText.deleteItem}
                    </button>
                  </div>
                  <div className="w-full sm:w-auto text-right">
                    <p className="text-base xs:text-lg font-titleFont font-semibold text-habesha_blue">
                      {language === 'EN' ? '$' : 'ETB '}
                      {getDisplayPrice(item.price * item.quantity)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="w-full py-2 xs:py-4">
              <button
                onClick={() => dispatch(resetCart())}
                className="px-6 xs:px-10 py-1 xs:py-2 bg-red-500 hover:bg-red-600 active:bg-red-700 text-habesha_white rounded-lg font-titleFont font-semibold text-sm xs:text-base"
              >
                {currentText.clearCart}
              </button>
            </div>
          </div>

          {/* Checkout Section */}
          <div className="w-full bg-habesha_white p-2 xs:p-4 col-span-1 rounded-md">
            <p className="flex gap-2 items-start text-xs xs:text-sm text-habesha_blue">
              <span className="text-green-500">
                <CheckCircleIcon />
              </span>
              {currentText.freeShipping}
            </p>
            <p className="font-semibold px-4 xs:px-6 py-2 flex items-center justify-between text-sm xs:text-base text-habesha_blue">
              {currentText.total}:{' '}
              <span className="text-base xs:text-lg font-bold">
                {language === 'EN' ? '$' : 'ETB '}
                {totalPrice}
              </span>
            </p>
            <button
              className="w-full font-titleFont font-medium text-sm xs:text-base bg-gradient-to-tr from-habesha_yellow to-[#f0c14b] border hover:from-yellow-300 hover:to-yellow-400 border-yellow-500 hover:border-yellow-700 active:bg-gradient-to-bl active:from-yellow-400 active:to-yellow-500 duration-200 py-1 xs:py-2 rounded-md mt-2 xs:mt-3"
            >
              {currentText.proceedToPay}
            </button>
          </div>
        </div>
      ) : (
        <motion.div
          initial={{ y: 70, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex flex-col xs:flex-row justify-center items-center gap-4 xs:gap-6 py-8 xs:py-10 max-w-[container] mx-auto"
        >
          <div>
            <img
              className="w-48 xs:w-64 sm:w-80 rounded-lg p-2 xs:p-4 mx-auto"
              src={emptyCart}
              alt="empty cart"
            />
          </div>
          <div className="w-full max-w-xs xs:max-w-sm p-2 xs:p-4 bg-habesha_white flex flex-col items-center rounded-md">
            <h1 className="font-titleFont text-lg xs:text-xl sm:text-2xl font-bold text-habesha_blue">
              {currentText.emptyCart}
            </h1>
            <p className="text-xs xs:text-sm text-center text-gray-600">
              {currentText.emptyCartMessage}
            </p>
            <Link to="/">
              <button
                className="w-full font-titleFont font-medium text-sm xs:text-base bg-gradient-to-tr from-habesha_yellow to-[#f0c14b] border hover:from-yellow-300 hover:to-yellow-400 border-yellow-500 hover:border-yellow-700 active:bg-gradient-to-bl active:from-yellow-400 active:to-yellow-500 duration-200 py-1 xs:py-2 rounded-md mt-2 xs:mt-3"
              >
                {currentText.continueShopping}
              </button>
            </Link>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Cart;