import { tDate } from '../../@types/types';

const convertDate: (age: string) => tDate = (age) => {
    const date = {
        yy: parseInt(age.slice(0, 4)),
        mm: parseInt(age.slice(4, 6)),
        dd: parseInt(age.slice(6, 8)),
    };
    return date;
};

const validatorAge: (age: string) => boolean = (age) => {
    const standardDay = {
        start: new Date(1900, 0),
        end: new Date(2022, 1),
    };

    const date = convertDate(age);
    const day = new Date(date.yy, date.mm, date.dd);

    if (standardDay.start < day && day < standardDay.end && date.yy > 1900) return true;
    return false;
};

export { convertDate, validatorAge };
