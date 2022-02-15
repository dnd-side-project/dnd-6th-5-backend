import { User } from '../entity/index';
import { tUser } from '../../@types/types.d';
import { getConnection } from 'typeorm';

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

const updateOneUserById: (id: string, nickname?: string) => Promise<tUser | undefined> = async (
    id,
    nickname
) => {
    const numId = parseInt(id);
    await getConnection()
        .createQueryBuilder()
        .update(User)
        .set({
            nickname: nickname,
        })
        .where('id = :id', { id: id })
        .execute();

    const targetUser = await User.findOne({ id: numId });
    return targetUser;
};

export { createUser, findOneUserByEmail, updateOneUserById };
