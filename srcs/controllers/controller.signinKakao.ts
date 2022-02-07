import { RequestHandler } from 'express';

const signinKakao: RequestHandler = async (req, res) => {
    try {
        console.log('로직');
        return res.status(200).json({
            data: 'data',
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

export default signinKakao;
