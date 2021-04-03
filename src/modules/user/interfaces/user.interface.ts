/**
 * User entity interface.
 */
export interface IUser {
    id: string;
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    lastLoginAt?: string;
}
