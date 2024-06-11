import type { FC, ReactNode } from "react";
import React from "react";
import { motion } from "framer-motion";

export const MotionDiv: FC<Props> = ({ children }) => (
  <motion.div
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
    initial={false}
    layout
  >
    {children}
  </motion.div>
);

export interface Props {
  readonly children?: ReactNode | undefined;
}
