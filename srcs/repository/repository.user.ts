import { Block, User } from '../entity/index';
import { tUser } from '../../@types/types.d';
import { getConnection } from 'typeorm';

const createUser: (user: tUser) => Promise<User> = async (user) => {
    const newUser = new User();
    newUser.email = user.email;
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

const findOneUserById: (id: string) => Promise<User | undefined> = async (id) => {
    const userId = parseInt(id);
    if (isNaN(userId)) throw Error('Please enter a numeric character for the id value.');

    const targetUser = await User.findOne({ id: userId });

    return targetUser;
};

const findOneUserByNickname: (nickname: string) => Promise<User | undefined> = async (nickname) => {
    const targetUser = await User.findOne({ nickname: nickname });
    return targetUser;
};

const updateOneUserNicknameById: (
    id: string,
    nickname?: string
) => Promise<tUser | undefined> = async (id, nickname) => {
    const numId = parseInt(id);
    if (isNaN(numId)) throw Error('Please enter a numeric character for the id value.');

    await User.createQueryBuilder()
        .update()
        .set({
            nickname: nickname,
        })
        .where('id = :id', { id: id })
        .execute();

    const targetUser = await User.findOne({ id: numId });
    if (targetUser === undefined) throw Error(`This is a user id that does not exist.`);
    return targetUser;
};

const updateOneUserFilterById: (user: tUser) => Promise<tUser | undefined> = async (user) => {
    const setObj = {
        age: user.age,
        workStatus: user.workStatus,
        companyScale: user.companyScale,
        medianIncome: user.medianIncome,
        annualIncome: user.annualIncome,
        asset: user.asset,
        hasHouse: user.hasHouse,
        isHouseOwner: user.isHouseOwner,
        maritalStatus: user.maritalStatus,
    };

    await getConnection()
        .createQueryBuilder()
        .update(User)
        .set(setObj)
        .where('id = :id', { id: user.id })
        .execute();

    const targetUser = await User.findOne({ id: user.id });
    if (targetUser === undefined) throw Error(`This user_id does not exist.`);

    return targetUser;
};

const deleteUserById: (id: number) => Promise<boolean> = async (id) => {
    if (isNaN(id)) throw Error('Please enter a numeric character for the id value.');
    await User.delete({ id: id });
    return true;
};

const blockUserById: (userId: number, blockedId: number) => Promise<void> = async (
    userId,
    blockedId
) => {
    const user = await User.findOneOrFail({ id: userId });
    const blocked = await User.findOneOrFail({ id: blockedId });

    const data = await Block.findOne({ user: user, blocked: blocked });

    // 데이터가 존재한다면
    if (data) {
        // block_check 값에 따라 update
        if (data.block_check === false) {
            Block.createQueryBuilder()
                .update()
                .set({
                    block_check: true,
                })
                .where('block.user_id = :userId', { userId: userId })
                .andWhere('block.blocked_id = :blockedId', { blockedId: blockedId })
                .execute();
        } else {
            Block.createQueryBuilder()
                .update()
                .set({
                    block_check: false,
                })
                .where('block.user_id = :userId', { userId: userId })
                .andWhere('block.blocked_id = :blockedId', { blockedId: blockedId })
                .execute();
        }
    } else {
        // 존재하지 않는다면 차단 데이터 추가, block_check 는 true 로
        await getConnection()
            .getRepository(Block)
            .save({ user: user, blocked: blocked, block_check: true });
    }
};

export {
    createUser,
    findOneUserByEmail,
    updateOneUserNicknameById,
    findOneUserById,
    findOneUserByNickname,
    updateOneUserFilterById,
    deleteUserById,
    blockUserById,
};
