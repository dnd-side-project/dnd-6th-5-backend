import { Router } from 'express';
import swaggerUI from 'swagger-ui-express';
import swaggerSpec from '../swagger/option';
import * as controller from '../controllers';
import * as middleware from '../middleware';
import { header } from 'express-validator';

const router = Router();
/*
    Set your router, but must check order of router
*/

router.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
router.get(
    '/login/naver',
    [
        header('access_token').exists({ checkFalsy: true }),
        header('refresh_token').exists({ checkFalsy: true }),
        middleware.validator,
    ],
    middleware.validator,
    controller.signinNaver
);
router.get(
    '/logout/naver',
    [header('access_token').exists({ checkFalsy: true }), middleware.validator],
    middleware.validator,
    controller.signoutNaver
);
router.get(
    '/login/kakao',
    [
        header('access_token').exists({ checkFalsy: true }),
        header('refresh_token').exists({ checkFalsy: true }),
        middleware.validator,
    ],
    controller.signinKakao
);
router.get(
    '/logout/kakao',
    [header('access_token').exists({ checkFalsy: true }), middleware.validator],
    controller.signoutKakao
);
router.get(
    '/token',
    [header('refresh_token').exists({ checkFalsy: true }), middleware.validator],
    controller.getAccessToken
);

router.use(middleware.isAuth);
router.get('/', (req, res) => {
    res.json({ data: 'data' });
});

export default router;
