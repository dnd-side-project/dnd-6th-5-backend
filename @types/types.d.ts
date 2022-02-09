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
