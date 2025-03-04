import { UserRequest } from "./userRequest";

export class EmployeeRequest {
  nome: string | undefined;
  sobrenome: string | undefined;
  telefone: string | undefined;
  celular: string | undefined;
  email: string | undefined;
  cep: string | undefined;
  dataNascimento: Date | undefined;
  nomeGestor: string | undefined;
  user: UserRequest | undefined;
  dtNascimentoAux: string | undefined;
}
