import React from "react";
import styled from "styled-components";
import { MdModeEdit } from "react-icons/md";
import { TiCancel } from "react-icons/ti";
import { toast } from "react-toastify";
import api from "../Services/api";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 0 10px;
  box-sizing: border-box;
  width: 100%;
`;

const TableContainer = styled.div`
  width: 100%;
  max-width: 1120px;
  background-color: rgb(255, 255, 255);
  padding: 20px;
  box-shadow: 0px 0px 5px black;
  border-radius: 9px;
  margin-top: 20px;
  margin: 20px auto 20px auto;
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  word-break: break-word;
`;

export const Thead = styled.thead`
  background-color: #2c73d2;
  color: white;
`;

export const Tbody = styled.tbody``;

export const Tr = styled.tr`
  transition: background-color 0.2s ease;
  &:hover {
    background-color: rgb(233, 233, 233);
  }
`;

export const Th = styled.th`
  padding: 10px;
  text-align: start;
  border-bottom: inset 2px rgb(0, 0, 0);
  white-space: nowrap;

  @media (max-width: 500px) {
    font-size: 12px;
    padding: 5px;
    ${(props) => props.onlyWeb && `display: none;`}
  }
`;

export const Td = styled.td`
  padding: 8px 10px;
  text-align: ${(props) => (props.alignCenter ? "center" : "start")};
  width: ${(props) => (props.width ? props.width : "auto")};
  vertical-align: middle;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 500px) {
    ${(props) =>
      props.onlyWeb &&
      `
      font-size: 12px;
      display: none;
      `}
  }
`;

const EditIcon = styled(MdModeEdit)`
  cursor: pointer;
  color: rgba(0, 0, 0, 0.56);
  transition: 0.5s;
  font-size: 20px;

  &:hover {
    color: rgb(207, 135, 0);
    transform: scale(1.8);
  }

  @media (max-width: 500px) {
    &:hover {
      transform: none;
    }
  }
`;

const DeleteIcon = styled(TiCancel)`
  padding: 5px;
  cursor: pointer;
  color: rgb(0, 0, 0);
  transition: 0.5s;
  font-size: 20px;

  &:hover {
    color: #c62828;
    transform: scale(1.8);
  }

  @media (max-width: 500px) {
    &:hover {
      transform: none;
    }
  }
`;

const TabelaRegistros = ({ users, setUsers, setOnEdit }) => {
  const handleEdit = (item) => {
    setOnEdit(item);
  };

const handleDelete = async (id) => {
  await api
    .delete("/" + id)
    .then(({ data }) => {
      const newArray = users.filter((user) => user.id !== id);
      setUsers(newArray);
      toast.success(data.mensagem);
    })
    .catch(({ erro }) => toast.error(erro.resposta?.data?.mensagem || "Erro inesperado"));
  setOnEdit(null);
};

  return (
    <Wrapper>
      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              <Th>CNPJ</Th>
              <Th>Razão</Th>
              <Th onlyWeb>Telefone</Th>
              <Th onlyWeb>Email</Th>
              <Th>Editar</Th>
              <Th>Excluir</Th>
            </Tr>
          </Thead>
          <Tbody>
            {users.map((item, i) => (
              <Tr key={i}>
                <Td width="30%">{item.cnpj}</Td>
                <Td width="30%">{item.razao}</Td>
                <Td width="20%" onlyWeb>{item.telefone}</Td>
                <Td width="30%" onlyWeb>{item.email}</Td>
                <Td alignCenter width="5%">
                  <EditIcon onClick={() => handleEdit(item)} />
                </Td>
                <Td alignCenter width="5%">
                  <DeleteIcon onClick={() => handleDelete(item.id)} />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Wrapper>
  );
};

export default TabelaRegistros;
