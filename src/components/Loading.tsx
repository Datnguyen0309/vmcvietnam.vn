export const Loading = () => {
  return (
    <div className="flex justify-center items-center min-h-[30px] space-x-2">
      <div className="dot bg-red-500"></div>
      <div className="dot bg-red-500"></div>
      <div className="dot bg-red-500"></div>
      <style jsx>{`
        .dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          display: inline-block;
          animation: dot 1.4s infinite ease-in-out both;
        }
        .dot:nth-child(1) {
          animation-delay: -0.32s;
        }
        .dot:nth-child(2) {
          animation-delay: -0.16s;
        }
        @keyframes dot {
          0%,
          80%,
          100% {
            transform: scale(0);
          }
          40% {
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
};
