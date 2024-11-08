import { IGastos } from "./gastos.interface";

export interface IGain{
    gasto:IGastos;
    date:Date| any;
    empresa:string;
    userRegister:string;
    total:string;
    categoria:string;
    id?:string;

}