import React from "react";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";
import { useLocation } from "react-router-dom";

const StartCard = ({
  end,
  suffix = "",
  label,
  duration = 2.5,
  fontSize = "text-4xl lg:text-6xl",
  textColor = "", // optional: let route decide if not passed
}) => {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: false,
  });

  const location = useLocation();
  const isHome = location.pathname === "/";
  const effectiveTextColor =
    textColor || (isHome ? "text-white" : "text-black");
  const labelColor =
    effectiveTextColor === "text-white"
      ? "text-gray-400"
      : "text-[#5F5F5F]";

  // Suffix splitting logic
  const firstChar = suffix.charAt(0);
  const restSuffix = suffix.slice(1);

  return (
    <p
      ref={ref}
      className="flex flex-col p-4 text-left border border-gray-700 bg-transparent rounded-lg"
    >
      <h2 className={`${fontSize} font-semibold mb-2 ${effectiveTextColor}`}>
        {inView ? <CountUp end={end} duration={duration} /> : "0"}
        
        {/* Agar suffix ka first char 'K' ho */}
        {firstChar === "K" ? (
          <>
            <span className="ml-1">{firstChar}</span>
            {restSuffix && (
              <span className="ml-1 text-base lg:text-xl align-top">
                {restSuffix}
              </span>
            )}
          </>
        ) : (
          suffix && (
            <span className="ml-1 text-base lg:text-lg align-top">
              {suffix}
            </span>
          )
        )}
      </h2>
      <p className={`text-sm ${labelColor}`}>{label}</p>
    </p>
  );
};

export default StartCard;
