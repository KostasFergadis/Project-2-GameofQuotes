import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

const EMBER_COUNT = 28;

const Homepage = () => {
  const navigate = useNavigate();

  const embers = useMemo(
    () =>
      Array.from({ length: EMBER_COUNT }, () => {
        const size = 2 + Math.random() * 4;
        return {
          left: `${Math.random() * 100}%`,
          width: size,
          height: size,
          animationDuration: `${7 + Math.random() * 9}s`,
          animationDelay: `${-Math.random() * 12}s`,
          "--drift": `${(Math.random() - 0.5) * 160}px`,
        };
      }),
    []
  );

  return (
    <div className="homepage">
      <div className="embers" aria-hidden="true">
        {embers.map((style, i) => (
          <span key={i} style={style} />
        ))}
      </div>

      <svg
        className="skyline"
        viewBox="0 0 1440 320"
        preserveAspectRatio="xMidYMax slice"
        aria-hidden="true"
      >
        <path
          d="M0 320V210l90-40 70 30 110-70 80 50 120-90 100 80 90-40 70 40 120-110 90 90 100-50 80 50 120-100 90 70 80-30 90 60 100-60 90 40V320Z"
          fill="#0d0f15"
          opacity="0.75"
        />
        <path
          d="M0 320V250l60-20v-40h20v30l50-10v-50h18v-14h14v14h18v50l60 20 40-30h30v-24h12v24h12v-24h12v24h30l50 40 70-30v-60h16v-18h12v18h16v60l80 30 60-20v-40h14v40l60 10v-30h30l30 30 90-20v-50h12v-14h10v14h12v50l70 20 70-30 50 30 60-20v-40h16v-14h12v14h16v40l50 20V320Z"
          fill="#07080c"
        />
      </svg>

      <div className="hero">
        <p className="hero-kicker">The Seven Kingdoms speak</p>
        <h1 className="hero-title">Game of Quotes</h1>
        <div className="hero-divider" />
        <p className="hero-tagline">
          "When you play the game of thrones, you win or you die."
        </p>
        <button className="cta-button" onClick={() => navigate("/characters")}>
          Enter the Realm
        </button>
      </div>
    </div>
  );
};

export default Homepage;
