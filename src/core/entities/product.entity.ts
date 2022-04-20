
export default interface IProduct {
    _id?: string;
    name: string;
    type: string;
    state?: string;
    description?: string;

    createdAt?: Date;
    updatedAt?: Date;
}