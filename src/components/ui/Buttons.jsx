import styles from "./Buttons.module.css";
export function Button({ title ,onClick}) {
  return (
    <button className={styles.gradientButton} onClick={onClick} >
      <svg
        width="100%"
        height="100%"
        style={{ position: "absolute", top: 0, left: 0 }}
      >
        <defs>
          <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop
              offset="0%"
              stopColor="#FF7E5F"
              className={styles.animatedGradient}
            />
            <stop
              offset="100%"
              stopColor="#ffffff"
              className={styles.animatedGradient}
            />
          </linearGradient>
        </defs>
        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          fill="url(#textGradient)"
        >
          {title}
        </text>
      </svg>
      <span style={{ visibility: "hidden" }}>{title}</span>
    </button>
  );
}

export default Button;
