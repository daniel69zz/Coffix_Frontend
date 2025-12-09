import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../services/AuthContext";
import { useState } from "react";

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
      await login(usuario, password);
      navigate("/main/ventas");
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
  width: 330px;
  height: 80%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  display: flex;
  flex-direction: column;
  justify-content: center;

  label,
  h2,
  input {
    background-color: white;
  }

  h2 {
    text-align: center;
    margin-bottom: 35px;
  }

  label {
    font-size: 18px;
    display: block;
    margin-top: 15px;
    font-weight: bold;
  }

  input {
    font-size: 18px;
    width: 100%;
    padding: 8px;
    margin-top: 5px;
    border: 1px solid #999;
    border-radius: 4px;
    margin-bottom: 25px;
  }

  button {
    width: 100%;
    padding: 10px;
    margin-top: 25px;
    background: #f7c22e;
    border: 1px solid #b48b12;
    border-radius: 4px;
    cursor: pointer;
    font-weight: bold;

    &:hover {
      background: #e4b020;
    }
  }
`;

const RightPanel = styled.div`
  flex: 1.2;
  background: #ff9900;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #4a2c2c;
  text-align: center;

  h1 {
    background-color: inherit;
    font-size: 35px;
    line-height: 1.3;
    max-width: 340px;
  }
`;

const LogoCircle = styled.div`
  height: 50%;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 25px;

  img {
    background-color: #f7c22e;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
  }
`;

const Logo = styled.span`
  font-size: 120px;
`;
