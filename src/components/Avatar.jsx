import { useState } from "react";

// Round portrait that falls back to a monogram when the image is missing or broken.
const Avatar = ({ src, name, className = "avatar" }) => {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div className={`${className} avatar-fallback`} aria-hidden="true">
        {name?.[0] ?? "?"}
      </div>
    );
  }

  return (
    <img
      className={className}
      src={src}
      alt={name}
      loading="lazy"
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
    />
  );
};

export default Avatar;
