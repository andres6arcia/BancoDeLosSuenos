
export default interface IUser {
    _id?: string;
    id: string;
    password: string;
    name?: string;
    products?: string[];

    createdAt?: Date;
    updatedAt?: Date;
}
