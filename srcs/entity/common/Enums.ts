export enum CompanyScale {
    NONE = '무직',
    MS5 = '중소기업(5인 이하)',
    MS30 = '중소기업(30인 이하)',
    MS50 = '중소기업(50인 이하)',
    MEDIUM = '중견기업',
    LARGE = '대기업',
    FREE = '프리랜서',
    SELF = '자영업자',
}

export enum WorkPeriod {
    NONE = '없음',
    ONE = '~ 1년 미만',
    THREE = '1년 이상 ~ 3년 미만',
    FIVE = '3년 이상 ~ 5년 미만',
    MORE = '5년 이상 ~',
}

export enum Income {
    TWOFIVE = '~ 2,500만원 미만',
    THREE = '2,600만원 이상 ~ 3,000만원 미만',
    THREEFIVE = '3,100만원 이상 ~ 3,500만원 미만',
    FOUR = '3,600만원 이상 ~ 4,000만원 미만',
    FOURFIVE = '4,100만원 이상 ~ 4,500만원 미만',
    MORE = '4,600만원 이상 ~',
    PRIVATE = '미공개',
}

export enum Asset {
    NONE = '없음',
    FIVE = '~ 5천만원 미만',
    ONE = '5천만원 이상 ~ 1억 미만',
    ONEFIVE = '1억 이상 ~ 1억 5천 미만',
    TWO = '1억 5천 이상 ~ 2억 미만',
    TWOFIVE = '2억 이상 ~ 2억 5천 미만',
    THREE = '2억 5천 이상 ~ 3억 미만',
    MORE = '3억 이상 ~',
    PRIVATE = '미공개',
}

export enum HasHouse {
    NONE = '무주택자',
    HAS = '유주택자',
    PRIVATE = '미공개',
}

export enum IsHouseOwner {
    HOST = '세대주',
    MEMBER = '세대구성원',
    PRIVATE = '미공개',
}

export enum SocialType {
    KAKAO = 'kakao',
    NAVER = 'naver',
}
