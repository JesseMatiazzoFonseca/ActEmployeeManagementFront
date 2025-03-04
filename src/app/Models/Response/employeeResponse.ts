import { UserRequest } from "../Request/userRequest";

export class EmployeeResponse {
  nome: string | undefined;
  sobrenome: string | undefined;
  telefone: string | undefined;
  celular: string | undefined;
  email: string | undefined;
  cep: string | undefined;
  dataNascimento: Date | undefined;
  nomeGestor: string | undefined;
  cpf!: string;
  roles: string | undefined;
  dtNascimentoAux: string | undefined;
}
