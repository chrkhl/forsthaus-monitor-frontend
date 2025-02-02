import { useEffect, useState } from "react";

export const BatteryIcon = ({ iconIdentifier } : { iconIdentifier: string }) => {
  const [iconUrl, setIconUrl] = useState<string | null>(null);

  useEffect(() => {
    import(`../assets/icons/${iconIdentifier}.png`).then((url) => {
      setIconUrl(url.default);
    });
  }, [iconIdentifier]);

  if (!iconUrl) {
    return null;
  }

  return (
    <img src={iconUrl} alt="Battery Icon" className="icon " />
  );
};