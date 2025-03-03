import { Routes } from '@angular/router';
import { LoginComponent } from './components/Login/Login.component';
import { CadastroComponent } from './components/cadastro/cadastro.component';

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
  }
];
