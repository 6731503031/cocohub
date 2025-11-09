import React from "react";
import { motion } from "framer-motion";

export default function Home(){
  return (
    <div className="hero-bg min-h-[60vh] flex items-center justify-center p-8">
      <motion.div initial={{opacity:0, y:20}} animate={{opacity:1,y:0}} transition={{duration:0.6}} className="text-center max-w-3xl">
        <h1 className="text-4xl font-bold text-coconut-green mb-4">Welcome to Coconut Knowledge Hub 🌴</h1>
        <p className="text-lg text-gray-700">Explore coconut varieties, research, marketplace and price tracker.</p>
      </motion.div>
    </div>
  );
}
