import confetti from "canvas-confetti";
export const handleRunConfetti = () => {
  confetti({
    particleCount: 500,
    spread: 70,
    origin: { y: 0.6 },
  });
};
