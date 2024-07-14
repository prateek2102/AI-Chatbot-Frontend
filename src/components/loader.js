import React from 'react';
import { motion } from 'framer-motion';

const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-stone-900">
      {/* Animation for falling text */}
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 80 }}
        className="text-white text-4xl font-bold relative"
      >
        Welcome to ChatMate 👨🏻‍💻
      </motion.div>

      {/* Animation for balls */}
      <motion.div
        initial={{ x: -100, y: 50 }}
        animate={{ x: 100, y: 50 }} 
        transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
        className="absolute top-1/2 transform -translate-y-1/2 h-10 w-10 rounded-full bg-gray-500"
      />
      <motion.div
        initial={{ x: 100, y: 50 }} 
        animate={{ x: -100, y: 50 }} 
        transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
        className="absolute top-1/2 transform -translate-y-1/2 h-10 w-10 rounded-full bg-gray-500"
      />
    </div>
  );
};

export default Loader;
