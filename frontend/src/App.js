import GlobalStyle from "./styles/global.js";
import styled from "styled-components";
import Form from "./Components/formulario.js";
import api from "./Services/api.js";
import TabelaRegistros from "./Components/TabelaRegistros.js";
import { useEffect, useState } from "react";
import { LuPanelTopOpen } from "react-icons/lu";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Container = styled.div`
width: 100%;
max-width: 1120px;
margin-top: 5px;
display: flex;
flex-direction: column;
align-items: center;
gap: 30px;
`;

const ToggleWrapper = styled.div`
width: 100%;
display: flex;
justify-content: center;
margin: 20px 0 0;
`;

const ToggleButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 32px;
  color: #2c73d2;
  transition: transform 0.5s ease;

  transform: ${({ ativo }) => (ativo ? "rotate(180deg)" : "rotate(0deg)")};
`;
  
  const Title = styled.h2`
  background-color: #2c73d2;
  Color: white;
  padding: 10px;
  max-width: 1120px;
  margin: 20px auto 0 auto;
  text-align: center;
  box-shadow: 0px 0px 5px black;
  border-radius: 9px 9px 9px;
  `;
  
function App() {
  
  const [users, setUsers] = useState([]);
  const [onEdit, setOnEdit] = useState(null);
  const [showForm, setShowForm] = useState(false);
  
  const trazerUsuarios = async () => {
    
    try {
      const res = await api.get("/");
      setUsers(res.data.sort((a, b) => (a.nome > b.nome ? 1 : -1)));
    } catch (error) {
      toast.error(error);
    }
};

useEffect(() => {
  trazerUsuarios();
}, [setUsers]);

return (
  <>
    <Container>

      <Title>REGISTRO DE CADASTROS</Title>

      <ToggleWrapper>
        <ToggleButton onClick={() => setShowForm((prev) => !prev)} ativo={showForm}>
          <LuPanelTopOpen />
        </ToggleButton>
      </ToggleWrapper>

      {showForm && (
      <Form
        onEdit={onEdit}
        setOnEdit={setOnEdit}
        trazerUsuarios={trazerUsuarios}
      />
      )}
        
      <TabelaRegistros setOnEdit={setOnEdit} users={users} setUsers={setUsers} />
      
    </Container>

      <ToastContainer
      position="top-center"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss={false}
      draggable={false}
      pauseOnHover
      theme="light"
      transition={Slide}
      />

    <GlobalStyle />
  </>
);
}

export default App;