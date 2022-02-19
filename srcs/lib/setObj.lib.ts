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

export default setUserFilter;
