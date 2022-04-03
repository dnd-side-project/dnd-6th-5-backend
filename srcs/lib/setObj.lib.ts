import { tUser } from '../../@types/types';

const setUserFilter: (user: tUser, data: any) => Promise<tUser> = async (user, data) => {
    const newUser = Object.assign({}, user);

    newUser.age = data.age;
    newUser.workStatus = data.workStatus;
    newUser.companyScale = data.companyScale;
    newUser.medianIncome = data.medianIncome;
    newUser.annualIncome = data.annualIncome;
    newUser.asset = data.asset;
    newUser.hasHouse = data.hasHouse;
    newUser.isHouseOwner = data.isHouseOwner;
    newUser.maritalStatus = data.maritalStatus;

    return newUser;
};

const toResObj: (user: any) => Promise<any> = async (user: any) => {
    const result = {
        id: user.id,
        nickname: user.nickname,
        age: user.age,
        workStatus: user.workStatus,
        companyScale: user.companyScale,
        medianIncome: user.medianIncome,
        annualIncome: user.annualIncome,
        asset: user.asset,
        hasHouse: user.hasHouse,
        isHouseOwner: user.isHouseOwner,
        maritalStatus: user.maritalStatus,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        token: {
            id: user.token.id,
            refreshToken: user.token.refreshToken,
            createdAt: user.token.createdAt,
        },
    };
    return result;
};

export { setUserFilter, toResObj };
