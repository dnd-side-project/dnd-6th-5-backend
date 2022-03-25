export enum Category {
    HOUSING = '주거',
    FINANCE = '금융',
}

// 재직여부
export enum WorkStatus {
    EMPLOYED = '재직자',
    UNEMPLOYED = '미취업자',
    UNCHECKED = '',
}

// 회사규모
export enum CompanyScale {
    MS = '중소기업',
    MEDIUM = '중견기업',
    SELF = '자영업자',
    FOUNDER = '(예비)창업자',
    ETC = '해당없음',
}

// 중위소득
export enum MedianIncome {
    THIRTY = '30% 이하',
    FORTY = '40% 이하',
    FORTYFIVE = '45% 이하',
    FIFTY = '50% 이하',
    SEVENTYTWO = '72% 이하',
    HUNDRED = '100% 이하',
    ETC = '해당없음',
    PRIVATE = '미공개',
}

// 연소득
export enum AnnualIncome {
    COUPLE_2 = '부부합산 2천만원 이하',
    COUPLE_5 = '부부합산 5천만원 이하',
    SINGLE_3 = '외벌이 3천만원 이하',
    SINGLE_35 = '외벌이 3.5천만원 이하',
    ETC = '해당없음',
    PRIVATE = '미공개',
}

// 순자산
export enum Asset {
    LESS = '2.92억원 이하',
    OVER = '2.92억원 초과',
    PRIVATE = '미공개',
}

// 주택소유여부
export enum HasHouse {
    NONE = '무주택자',
    HAS = '유주택자',
    PRIVATE = '미공개',
}

// 세대주여부
export enum IsHouseOwner {
    HOST = '세대주 혹은 예비세대주',
    MEMBER = '세대구성원',
    PRIVATE = '미공개',
}

// 혼인여부
export enum MaritalStatus {
    SINGLE = '미혼',
    MARRIED = '기혼',
}

// 소셜 로그인 타입
export enum SocialType {
    KAKAO = 'kakao',
    NAVER = 'naver',
}
