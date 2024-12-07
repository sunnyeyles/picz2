import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { ImageCard } from "../ImageCard";

type HoverEffectProps = {
  items: {
    id: string;
    title: string;
    imageUrl: string;
    description?: string;
    onDelete: () => void;
    onDownload: () => void;
  }[];
};

export const HoverEffect = ({ items }: HoverEffectProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {items.map((item, idx) => (
        <div
          key={item.id}
          className="relative group"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.div
                className="absolute inset-0 bg-neutral-200 dark:bg-slate-800/[0.8] rounded-2xl scale-105 z-10 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>

          <div className="relative z-20">
            <ImageCard
              imageUrl={item.imageUrl}
              title={item.title}
              onDelete={item.onDelete}
              onDownload={item.onDownload}
              description={item.description}
            />
          </div>
        </div>
      ))}
    </div>
  );
};
