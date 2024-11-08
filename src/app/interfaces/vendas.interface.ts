export interface IVendas{
    venda:string;
    quantidade:number;
    preco:string;
}
export interface VendasInterface{
    venda:IVendas,
    dataVenda:string |any;
    total:string;
    userRegister:string;
    empresa:string;
    modoPagamento:string;
    id?:string;
}
export enum ModoPagamento{
    CREDITO='credito',
    DEBITO= 'debito',
    DINHEIRO ='dinheiro',
    PIX='pix'
}