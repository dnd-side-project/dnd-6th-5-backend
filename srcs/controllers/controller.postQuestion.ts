import { RequestHandler } from 'express';
import { createQuestion } from '../repository/index';

const postQuestion: RequestHandler = async (req, res) => {
    try {
        const newQuestion = await createQuestion(req.body);
        return res.status(200).json({
            success: true,
            data: { newQuestion },
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            error: {
                code: error.name,
                message: error.message,
            },
        });
    }
};

export default postQuestion;
