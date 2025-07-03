import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import api from "../Services/api"


const FormContainer = styled.form`
  width: 100%;
  max-width: 1120px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: rgb(255, 255, 255);
  padding: 20px 20px 20px 20px;
  box-shadow: 0px 0px 5px black;
  border-radius: 9px;
  margin-top: 20px;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 0 10px;
  box-sizing: border-box;
  width: 100%;
`;


const InputArea = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  
`;

const Input = styled.input`
  width: 100%;
  padding: 0 12px;
  border: 1px solid #bbb;
  border-radius: 9px;
  height: 40px;
  box-sizing: border-box; 
`;

const Label = styled.label`
  color: black;
  font-weight: bold;
  padding: 9px;
`;

const ButtonSave = styled.button`
  padding: 10px;
  cursor: pointer;
  border-radius: 9px;
  border: none;
  background-color: #2c73d2;
  color: white;
  height: 40px;
  font-weight: bold;
  margin: 1px;
  width: 100%;
  max-width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  transition: background-color 0.5s, color 0.5s, transform 0.1s;

  &:hover {
    background-color: rgb(13, 155, 0);
  }
  &:active {
    background-color:rgb(13, 155, 0); 
    transform: scale(0.85);
  }
`;

const ButtonClear = styled.button`
  padding: 10px;
  cursor: pointer;
  border-radius: 9px;
  border: none;
  background-color: #2c73d2;
  color: white;
  height: 40px;
  font-weight: bold;
  margin: 1px;
  width: 100%;
  max-width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  transition: background-color 0.5s, color 0.5s, transform 0.1s;

  &:hover {
    background-color: rgb(226, 192, 0);
    color: black;
  }
  &:active {
    background-color:rgb(226, 192, 0); 
    transform: scale(0.85);
    color: black;
  }
`;



const Form = ({ trazerUsuarios, onEdit, setOnEdit }) => {
  const [cnpj, setCnpj] = useState("");
  const [razao, setRazao] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (onEdit) {
      setCnpj(onEdit.cnpj || "");
      setRazao(onEdit.razao || "");
      setTelefone(onEdit.telefone || "");
      setEmail(onEdit.email || "");
    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!cnpj || !razao || !telefone || !email) {
      return toast.warn("Preencha todos os campos!");
    }

    const payload = { cnpj, razao, telefone, email };

    try {
      if (onEdit) {
        const { data } = await api.put("/" + onEdit.id, payload);
        toast.success(data.mensagem);
      } else {
        const { data } = await api.post("/", payload);
        toast.success(data.mensagem);
      }
    } catch (erro) {
      toast.error(erro.response?.data?.mensagem || "Erro inesperado");
    }

    limparFormulario();
    trazerUsuarios();
  };

  const limparFormulario = () => {
    setCnpj("");
    setRazao("");
    setTelefone("");
    setEmail("");
    setOnEdit(null);
  };

const formatarCNPJ = (value) => {
  return value
  .replace(/\D/g, "")
  .replace(/^(\d{2})(\d)/, "$1.$2")
  .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
  .replace(/\.(\d{3})(\d)/, ".$1/$2")
  .replace(/(\d{4})(\d)/, "$1-$2")
  .replace(/(-\d{2})\d+?$/, "$1");
};

const formatarDDD = (value) => {
  return value
    .replace(/\D/g, "")                     
    .replace(/^(\d{2})(\d)/, "($1)$2")      
    .replace(/(\d{5})(\d)/, "$1-$2")        
    .replace(/(-\d{4})\d+?$/, "$1");        
}

const InputMaiusculoRazao = styled(Input)`
  text-transform: uppercase;
`;

return (
  <Wrapper>
      <FormContainer onSubmit={handleSubmit}>
        <InputArea>

          <Label>CNPJ</Label>
            <Input name="cnpj" value={cnpj} onChange={(e) => setCnpj(formatarCNPJ(e.target.value))}/>
        </InputArea>

        <InputArea>
          <Label>Razão</Label>
            <InputMaiusculoRazao name="razao" value={razao} onChange={(e) => setRazao(e.target.value.toUpperCase())} />
        </InputArea>

        <InputArea>
          <Label>Telefone</Label>
            <Input name="telefone" value={telefone} onChange={(e) => setTelefone(formatarDDD(e.target.value))} />
        </InputArea>
        
        <InputArea>
          <Label>Email</Label>
            <Input name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </InputArea>
        
        <ButtonClear type="button" onClick={limparFormulario}>LIMPAR</ButtonClear>
        <ButtonSave type="submit">SALVAR</ButtonSave>
      </FormContainer>
    
  </Wrapper>
);
};

export default Form;