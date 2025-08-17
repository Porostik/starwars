import Logo from '@/shared/assets/logo.png';
import { motion } from 'framer-motion';

export const Header = () => {
  return (
    <header className="bg-background p-3 md:p-5 backdrop-blur-lg sticky top-0 z-1">
      <motion.img
        className="h-10 w-[80px] mx-auto md:h-14 md:w-[140px]"
        src={Logo}
        alt="Logo"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      />
    </header>
  );
};
