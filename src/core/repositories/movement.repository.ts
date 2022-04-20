import Movement from "../entities/movement.entity";

export default interface MovementRepository {
    isValidId(id: string): boolean;
    getByDates(productId: string, startDate: Date, endDate: Date): Promise<Movement[]>;
    getAll(productId:string): Promise<Movement[]>
    getById(id: string): Promise<Movement | null>
    create(movement: Movement): Promise<Movement>
    update(movement: Movement): Promise<Movement>
}