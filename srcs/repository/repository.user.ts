import { User } from '../entity/index';
import { tUser } from '../../@types/types.d';

const createUser: (user: tUser) => Promise<User> = async (user) => {
    const newUser = new User();
    newUser.email = user.email;
    await newUser.save();

    newUser.nickname = newUser.id.toString();
    await newUser.save();

    return newUser;
};

const findOneUserByEmail: (user: tUser) => Promise<User | undefined> = async (user) => {
    const targetUser = await User.createQueryBuilder('user')
        .leftJoinAndSelect('user.token', 'token')
        .where('user.email = :email', { email: user.email })
        .getOne();
    return targetUser;
};

export { createUser, findOneUserByEmail };
