import { Role } from "./role";


export interface Token {

    AccessToken: String;
    AccessTokentype: String;
	id: number;
	username: String;
	roles: Role;
}
