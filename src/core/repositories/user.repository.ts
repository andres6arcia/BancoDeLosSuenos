
import User from '../entities/user.entity';

export default interface UserRepository {
    getById(id: string): Promise<User | null>
    create(user: User): Promise<User>
    update(user: User): Promise<User>
}

