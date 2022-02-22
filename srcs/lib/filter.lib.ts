import { convertDate } from '.';

const convertRealAge: (age?: any) => number = (age) => {
    const curr = new Date();
    const nowDate = {
        yy: curr.getFullYear(),
        mm: curr.getMonth() + 1,
        dd: curr.getDate(),
    };
    const userAge = convertDate(age);
    const realAge = nowDate.yy - userAge.yy;
    if (nowDate.mm < userAge.mm) return realAge - 1;
    if (nowDate.mm === userAge.mm && nowDate.dd < userAge.dd) return realAge - 1;
    return realAge;
};

const convertWorkStatus: (workStatus: string) => string = (workStatus) => {
    switch (workStatus) {
        case '재직자':
            return '미취업자';
        case '미취업자':
            return '재직자';
    }
    return workStatus;
};

const convertCompanyScale: (companyScale: string) => string = (companyScale) => {
    switch (companyScale) {
        case '해당없음':
            return '0000';
        case '미공개':
            return '';
    }
    return companyScale;
};

const convertMedianIncome: (medianIncome: string) => string = (medianIncome) => {
    switch (medianIncome) {
        case '해당없음':
            return '0000';
        case '미공개':
            return '';
    }
    medianIncome = medianIncome.replace(/[^0-9-]/g, '');
    return medianIncome;
};

const convertAsset: (asset: string) => string = (asset) => {
    switch (asset) {
        case '2.92억원 초과':
            return '0000';
        case '미공개':
            return '';
    }
    return asset;
};

const convertAnnualIncome: (annualIncome: string) => string = (annualIncome) => {
    switch (annualIncome) {
        case '부부합산 2천만원 이하':
            return '부부합산';
        case '외벌이 3천만원 이하':
            return '외벌이';
        case '해당없음':
            return '00';
        case '미공개':
            return '';
    }
    return annualIncome;
};

const convertHasHouse: (hasHouse: string) => string = (hasHouse) => {
    switch (hasHouse) {
        case '무주택자':
            return '유주택자';
        case '유주택자':
            return '무주택자';
        case '미공개':
            return '';
    }
    return hasHouse;
};

const convertIsHouseOwner: (isHouseOwner: string) => string = (isHouseOwner) => {
    switch (isHouseOwner) {
        case '세대구성원':
            return '세대주 혹은 예비세대주';
        case '세대주 혹은 예비세대주':
            return '세대구성원';
        case '미공개':
            return '';
    }
    return isHouseOwner;
};

const convertMaritalStatus: (isHouseOwner: string) => string = (isHouseOwner) => {
    switch (isHouseOwner) {
        case '미혼':
            return '기혼';
        case '기혼':
            return '미혼';
    }
    return isHouseOwner;
};

const convertForFilterData: (userInfo?: any) => Promise<any> = async (userInfo) => {
    userInfo.age = convertRealAge(userInfo.age);
    userInfo.workStatus = convertWorkStatus(userInfo.workStatus);
    userInfo.companyScale = convertCompanyScale(userInfo.companyScale);
    userInfo.medianIncome = convertMedianIncome(userInfo.medianIncome);
    userInfo.annualIncome = convertAnnualIncome(userInfo.annualIncome);
    userInfo.asset = convertAsset(userInfo.asset);
    userInfo.hasHouse = convertHasHouse(userInfo.hasHouse);
    userInfo.isHouseOwner = convertIsHouseOwner(userInfo.isHouseOwner);
    userInfo.maritalStatus = convertMaritalStatus(userInfo.maritalStatus);
    return userInfo;
};

export default convertForFilterData;
