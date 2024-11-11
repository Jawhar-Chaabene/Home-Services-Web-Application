import { EntityState } from "@ngrx/entity";

export interface Users {
    id: string;
    username: string;
    password: string;
    name: string;
    email: string;
    phone: string;
    role: string;
    gender: string;
    status: boolean;
    img: any[];

}



export interface Userinfo {
    id: number,
    username: string,
    name: string,
    email: string,
    phone: string;
    role: string,
    status: boolean
}
export interface Usercred {
    username: string,
    password: string
}


// export interface Roles {
//     code: string,
//     name: string
// }
export enum Role {
    Admin = 'admin',
    Client = 'client',
    Prestateur = 'prestateur'
}



export interface Roleaccess {
    role: string,
    menu: string
}

// export interface UserModel extends EntityState<Users> {
//     isDuplicate: boolean,
//     menulist: Roleaccess[],
//     roles: Roles[],
//     userinfo: Userinfo
// }