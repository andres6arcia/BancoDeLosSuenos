
export default interface IMovement {
    _id?: string;
    productId: string;
    value: number;
    description?: string;
    state: number;
    store?: string;
    tax?: number;

    createdAt?: Date;
    updatedAt?: Date;
}