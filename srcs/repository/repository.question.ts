import { Question } from '../entity/index';
import { findOneUserById } from './index';
import { User } from '../entity/index';

const createQuestion: (user: any) => Promise<Question> = async (user) => {
    const newQuestion = new Question();
    newQuestion.email = user.email;
    newQuestion.content = user.content;
    newQuestion.user = (await findOneUserById(user.userId)) as User;
    await newQuestion.save();

    return newQuestion;
};

export { createQuestion };
