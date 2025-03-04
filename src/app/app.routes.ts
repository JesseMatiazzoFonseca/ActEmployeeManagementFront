import { Routes } from '@angular/router';
import { LoginComponent } from './components/Login/Login.component';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { EditarCadastroComponent } from './components/editar-cadastro/editar-cadastro.component';
import { AuthGuard } from './guard/guard.guard';
import { ListFuncionariosComponent } from './components/list-funcionarios/list-funcionarios/list-funcionarios.component';
import { GuardAdm } from './guard/guard-adm.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "cadastro",
    component: CadastroComponent
  },
  {
    path: "editar/:codUsuario",
    component: EditarCadastroComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "list-funcionarios",
    component: ListFuncionariosComponent,
    canActivate: [GuardAdm]
  }
];
