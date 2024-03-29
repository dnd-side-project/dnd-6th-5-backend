import tJest from '@types/jest';

export default tJest;

import {
    WorkStatus,
    CompanyScale,
    MedianIncome,
    AnnualIncome,
    Asset,
    HasHouse,
    IsHouseOwner,
    MaritalStatus,
} from './common/Enums';
import { User } from '../entity/index';

export declare type tTokenInfo = {
    code: number;
    msg?: string;
};

export declare type tTokenData = {
    token_type: string;
    access_token?: string | string[];
    expires_in: Integer;
    refresh_token?: tKakaoToekn;
    refresh_token_expires_in?: Integer;
};

export declare type tTokenResponse = {
    status: number;
    data: tTokenData | tTokenAbnormalResponseData;
};

export declare type tTokenAbnormalResponseData = {
    token_type?: string;
    access_token?: string | string[];
    expires_in?: Integer;
    refresh_token?: string | string[];
    refresh_token_expires_in?: Integer;
    error?: string;
    error_description?: tring;
    error_code?: string;
};

export declare type tUser = {
    id?: number;
    email: string;
    nickname?: string;
    age?: Date;
    workStatus?: WorkStatus;
    companyScale?: CompanyScale;
    medianIncome?: MedianIncome;
    annualIncome?: AnnualIncome;
    asset?: Asset;
    hasHouse?: HasHouse;
    isHouseOwner?: IsHouseOwner;
    maritalStatus?: MaritalStatus;
    createdAt?: Date;
    updatedAt?: Date;
};

export declare type tToken = {
    id?: number;
    refreshToken?: string;
    createdAt?: Date;
    expiresAt?: string;
    user?: User;
};

export declare type tPost = {
    userId?: number;
    title?: string;
    category?: string;
    content?: string;
    age?: Date;
    maritalStatus?: MaritalStatus;
    workStatus?: WorkStatus;
    companyScale?: CompanyScale;
    medianIncome?: MedianIncome;
    annualIncome?: AnnualIncome;
    asset?: Asset;
    isHouseOwner?: IsHouseOwner;
    hasHouse?: HasHouse;
};

export declare type tDate = {
    yy: number;
    mm: number;
    dd: number;
};

export declare type postByUserArray = {
    byUser?: postByUserObj[] | [];
};

export declare type postByUserObj = {
    user_id: number;
    post_id: number;
    nickname: string;
    category: string;
    title: string;
    content: string;
    cnt?: number;
    createdAt: string;
    updatedAt: string;
};
