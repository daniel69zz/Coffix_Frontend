import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../services/AuthContext";
import { useState } from "react";
import { firstAllowedPath } from "../utils/role";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const data = await login(usuario, password);
      navigate(firstAllowedPath(data.rol), { replace: true });
    } catch (err) {
      setError(err.message || "Error al iniciar sesión");
    }
  };
  return (
    <Container>
      <LeftPanel>
        <LeftBox>
          <h2>INICIAR SESION</h2>
          <label>Usuario:</label>
          <input
            type="text"
            placeholder="Ingresa tu usuario"
            onChange={(e) => setUsuario(e.target.value)}
          />
          <label>Contraseña:</label>
          <input
            type="password"
            placeholder="Ingresa tu contraseña"
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p style={{ color: "red" }}>{error}</p>}
          <button onClick={onSubmit}>Iniciar sesión</button>
        </LeftBox>
      </LeftPanel>

      <RightPanel>
        <LogoCircle>
          <img src="logo_sis_v3.png" alt="logo cafeteria" />
        </LogoCircle>
        <h1>CAFETERIA COFFIX</h1>
      </RightPanel>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  font-family: Arial, sans-serif;
`;

const LeftPanel = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LeftBox = styled.div`
  background: white;
  padding: 40px;
  border-radius: 12px;
  width: 360px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  display: flex;
  flex-direction: column;

  h2 {
    text-align: center;
    margin-bottom: 25px;
    font-size: 26px;
    color: #333;
    font-weight: bold;
  }

  label {
    font-size: 16px;
    margin-top: 12px;
    font-weight: 600;
    color: #444;
  }

  input {
    margin-top: 6px;
    font-size: 16px;
    padding: 10px;
    border-radius: 8px;
    border: 1px solid #c8c8c8;
    outline: none;
    transition: 0.2s;

    &:focus {
      border-color: #ff9900;
      box-shadow: 0 0 5px rgba(255, 153, 0, 0.4);
    }
  }

  button {
    width: 100%;
    padding: 10px;
    margin-top: 25px;
    background: #ff9900;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-weight: bold;
    color: white;
    font-size: 17px;
    transition: 0.2s;

    &:hover {
      background: #e68a00;
    }
  }
`;

const RightPanel = styled.div`
  flex: 1.2;
  background: linear-gradient(135deg, #ff9900, #ffb84d);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #4a2c2c;
  text-align: center;

  h1 {
    font-size: 42px;
    margin-top: 20px;
    color: white;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
  }
`;

const LogoCircle = styled.div`
  height: 390px;
  width: 390px;
  border-radius: 50%;
  background: #f8f7a9ff;
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;

  img {
    width: 130%;
    object-fit: contain;
  }
`;
