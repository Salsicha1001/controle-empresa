import { IGain } from "src/app/interfaces/gain.interface";

export interface Iprojeto{
    id:string;
    nome:string;
    descricao:string;
    gastos:Array<IGain>;
    photos:Array<string>;
    resultPhoto:string;
    material:Array<IMaterial>;
}
export interface IMaterial{
    material:string;
    quantidade:number;
}