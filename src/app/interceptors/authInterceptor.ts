import { HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const user = sessionStorage.getItem('user');
  let token = "";
  if (user) {
    token = JSON.parse(user).token;
  }
  const authReq = token
    ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    : req;

  return next(authReq);
}
