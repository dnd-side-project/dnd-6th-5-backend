import { User } from '../entity/index';
import { tUser } from '../../@types/types.d';

const createUser: (user: tUser) => Promise<User> = async (user) => {
    const newUser = new User();
    newUser.email = user.email;
    await newUser.save();

    return newUser;
};

export { createUser };
