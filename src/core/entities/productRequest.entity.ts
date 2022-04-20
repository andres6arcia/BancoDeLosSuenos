
export default interface IProductRequest {
    _id?: string;
    type: string;
    state?: string;

    createdAt?: Date;
    updatedAt?: Date;
}