import { Router } from 'express';
import swaggerUI from 'swagger-ui-express';
import swaggerSpec from '../swagger/option';
import * as controller from '../controllers';
import * as middleware from '../middleware';
import { header, body } from 'express-validator';
import {
    WorkStatus,
    CompanyScale,
    MedianIncome,
    AnnualIncome,
    Asset,
    HasHouse,
    IsHouseOwner,
    MaritalStatus,
} from '../entity/common/Enums';

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
    [
        header('refresh_token').exists({ checkFalsy: true }),
        header('platform').isIn(['naver', 'kakao']),
        middleware.validator,
    ],
    controller.getAccessToken
);

router.get('/policy', controller.getPolicyList);
router.get('/policy/:id', controller.getPolicyDetail);
router.post('/policy/filter', controller.getFilteredPolicyList);
router.post(
    '/policy/like',
    [
        body('userId').exists({ checkFalsy: true }),
        body('policyId').exists({ checkFalsy: true }),
        middleware.validator,
    ],
    controller.likePolicy
);

router.get('/posts', controller.getCommunityList);
router.post('/posts/:id/comment', controller.postComment);

// 인증 미들 웨어
// router.use(middleware.isAuth);
router.get('/', (req, res) => {
    res.json({ data: 'data' });
});
router.patch(
    '/user/nickname',
    [
        body('id').exists({ checkFalsy: true }),
        body('nickname').exists({ checkFalsy: true }),
        middleware.validator,
    ],
    controller.patchUserNickname
);
router.patch(
    '/user',
    [
        body('id').exists({ checkFalsy: true }),
        body('age').isLength({ min: 8, max: 8 }),
        body('maritalStatus').isIn(Object.values(MaritalStatus)),
        body('workStatus').isIn(Object.values(WorkStatus)),
        body('companyScale').isIn(Object.values(CompanyScale)),
        body('medianIncome').isIn(Object.values(MedianIncome)),
        body('annualIncome').isIn(Object.values(AnnualIncome)),
        body('asset').isIn(Object.values(Asset)),
        body('isHouseOwner').isIn(Object.values(IsHouseOwner)),
        body('hasHouse').isIn(Object.values(HasHouse)),
        middleware.validator,
    ],
    controller.patchUserFilterInfo
);
router.get('/user/:id', controller.getOneUser);
router.get('/user/:id/post', controller.getOneUserPosts);

router.get('/posts/:id', controller.getPostDetail);

export default router;
