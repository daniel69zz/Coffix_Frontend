import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../services/AuthContext";
import { useState } from "react";
import { firstAllowedPath } from "../utils/role";
import logo from "/logo_sis_v3.png";
import { enviarCorreoAviso } from "../services/email";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showForgot, setShowForgot] = useState(false);
  const [forgotMessage, setForgotMessage] = useState(
    "Ingrese su correo para recuperar su contraseña"
  );
  const [forgotLoading, setForgotLoading] = useState(false);
  const [correoRecuperacion, setCorreoRecuperacion] = useState("");

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

  const handleForgotPassword = () => {
    setShowForgot(true);
    setForgotMessage("Ingrese su correo para recuperar su contraseña");
    setCorreoRecuperacion("");
    setForgotLoading(false);
  };

  const handleSendRecoveryEmail = async () => {
    const email = correoRecuperacion.trim();

    if (!email) {
      setForgotMessage("Ingrese el correo para recuperar la contraseña");
      return;
    }

    try {
      setForgotLoading(true);
      setForgotMessage("Verificando usuario...");

      const url = `http://localhost:8080/auth/exists?user=${encodeURIComponent(
        email
      )}`;
      const res = await fetch(url);

      if (!res.ok) {
        throw new Error("Error al verificar usuario");
      }

      const exists = await res.json();

      if (!exists) {
        setForgotMessage(
          "El usuario no existe. Verifique el correo ingresado."
        );
        return;
      }

      try {
        await enviarCorreoAviso({ correo: email, nombre: email });
        setForgotMessage("Se ha enviado una contraseña nueva a su correo");
      } catch (err) {
        console.error(err);
        setForgotMessage("Se ha enviado una contraseña nueva a su correo");
      }
    } catch (err) {
      console.error(err);
      setForgotMessage(
        err.message ||
          "Ocurrió un error al procesar la solicitud. Intente nuevamente."
      );
    } finally {
      setForgotLoading(false);
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
          <div className="Recuperar">
            <span onClick={handleForgotPassword}>
              ¿Olvidaste tu contraseña?
            </span>
          </div>
        </LeftBox>
      </LeftPanel>

      <RightPanel>
        <LogoCircle>
          <img src="logo_sis_v3.png" alt="logo cafeteria" />
        </LogoCircle>
        <h1>CAFETERIA COFFIX</h1>
      </RightPanel>

      {showForgot && (
        <Overlay>
          <ForgotCard>
            <ForgotLogoWrapper>
              <div className="imgContent">
                <img src={logo} alt="logo coffix" />
              </div>
            </ForgotLogoWrapper>

            <ForgotContent>
              <ForgotMessage>{forgotMessage}</ForgotMessage>

              <ForgotEmailInput
                type="email"
                placeholder="Ingrese su correo"
                value={correoRecuperacion}
                onChange={(e) => setCorreoRecuperacion(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSendRecoveryEmail();
                  }
                }}
              />

              <ForgotButtonsRow>
                <ForgotCloseButton
                  type="button"
                  onClick={() => setShowForgot(false)}
                  disabled={forgotLoading}
                >
                  CERRAR
                </ForgotCloseButton>

                <ForgotButton
                  type="button"
                  onClick={handleSendRecoveryEmail}
                  disabled={forgotLoading}
                >
                  {forgotLoading ? "PROCESANDO..." : "ENVIAR"}
                </ForgotButton>
              </ForgotButtonsRow>
            </ForgotContent>
          </ForgotCard>
        </Overlay>
      )}
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

  .Recuperar {
    margin-top: 15px;
    font-size: 15px;
    display: flex;
    align-items: center;
    justify-content: center;

    span {
      cursor: pointer;
      color: #ff9900;
      font-weight: 600;

      &:hover {
        text-decoration: underline;
      }
    }
  }

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

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;

const ForgotCard = styled.div`
  background: white;
  border-radius: 40px;
  padding: 28px 36px;
  display: flex;
  align-items: center;
  gap: 24px;
  min-width: 520px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
`;

const ForgotLogoWrapper = styled.div`
  width: 75px;
  height: 75px;
  border-radius: 50%;
  background: #fff7d0;
  display: flex;
  align-items: center;
  justify-content: center;

  .imgContent {
    display: flex;
    img {
      height: 130px;
      object-fit: contain;
    }
  }
`;

const ForgotContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ForgotMessage = styled.p`
  font-size: 18px;
  font-weight: 700;
  color: #333;
`;

const ForgotEmailInput = styled.input`
  width: 100%;
  margin-top: 4px;
  padding: 8px 10px;
  border-radius: 8px;
  border: 1px solid #c8c8c8;
  font-size: 14px;
  outline: none;
  transition: 0.2s;

  &:focus {
    border-color: #ff9900;
    box-shadow: 0 0 5px rgba(255, 153, 0, 0.4);
  }
`;

const ForgotButton = styled.button`
  align-self: center;
  padding: 8px 18px;
  border-radius: 8px;
  border: 1px solid #c79c00;
  background: #ffd000;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.5px;
  cursor: pointer;
  transition: 0.2s ease;

  &:hover {
    background: #e6b800;
  }
`;

const ForgotButtonsRow = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 8px;
  justify-content: center;
`;

const ForgotCloseButton = styled(ForgotButton)`
  background: #e1e1e1;
  border-color: #b5b5b5;

  &:hover {
    background: #cfcfcf;
  }
`;
