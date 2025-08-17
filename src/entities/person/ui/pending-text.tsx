import { cn } from "@/shared/lib/utils";
import { motion } from "framer-motion";

export const PendingText = ({ className }: { className?: string }) => {
  return (
    <motion.div
      className={cn("flex items-center justify-center", className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <span className="text-white font-medium text-sm">
        Data on the way… just a moment.
      </span>
    </motion.div>
  );
};
