import { useState } from "react";

export const LoginPage = ({ onLogin } : { onLogin: (args: { token: string, serialNumber: string, longitude: string, latitude: string}) => void}) => {
  const [token, setToken] = useState("");
  const [serialNumber, setSerialNumber] = useState("");
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");

  const handleLogin = () => {
    onLogin({ token, serialNumber, longitude, latitude });
  }

  return (
    <article className="login">
      <h1>Login</h1>

      <div>
        <label htmlFor="token"></label>
        <input
          type="text"
          id="token"
          name="token"
          placeholder="Token"
          value={token}
          onChange={(event) => setToken(event.target.value)}
        />
      </div>

      <div>
        <label htmlFor="serialNumber"></label>
        <input
          type="text"
          id="serialNumber"
          name="serialNumber"
          placeholder="Serial Number"
          value={serialNumber}
          onChange={(event) => setSerialNumber(event.target.value)}
        />
      </div>

      <div>
        <label htmlFor="latitude"></label>
        <input
          type="text"
          id="latitude"
          name="latitude"
          placeholder="Latitude"
          value={latitude}
          onChange={(event) => setLatitude(event.target.value)}
        />
      </div>

      <div>
        <label htmlFor="longitude"></label>
        <input
          type="text"
          id="longitude"
          name="longitude"
          placeholder="Longitude"
          value={longitude}
          onChange={(event) => setLongitude(event.target.value)}
        />
      </div>

      <button
        disabled={!token || !serialNumber || !longitude || !latitude}
        onClick={handleLogin}
      >
        Login
      </button>
    </article>
  );
}