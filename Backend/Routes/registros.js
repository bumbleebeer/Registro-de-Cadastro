import express from "express";
import { cadastrarEmpresa, deletarRegistro, listarRegistros, editarDados } from "../Controllers/registros.js";

const router = express.Router()

router.get("/", listarRegistros)

router.post("/", cadastrarEmpresa)

router.put("/:id", editarDados)

router.delete("/:id", deletarRegistro)

export default router