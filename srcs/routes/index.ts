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
    Category,
    ReportReason,
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

router.delete(
    '/user/naver',
    [header('access_token').exists({ checkFalsy: true }), middleware.validator],
    controller.deleteUserNaver
);

router.delete(
    '/user/kakao',
    [header('access_token').exists({ checkFalsy: true }), middleware.validator],
    controller.deleteUserKakao
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

router.get('/user/check-duplicate', controller.checkNicknameDuplicate);

router.get('/', controller.getHome);
router.get('/policy', controller.getPolicyList);

router.get('/posts', controller.getCommunityList);
router.get('/posts/search', controller.searchCommunity);

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
router.get('/user/:id/comment', controller.getOneUserComments);
router.get('/user/:id/like/policy', controller.getOneUserLikePolicy);

router.post(
    '/posts',
    [
        body('userId').exists({ checkFalsy: true }),
        body('title').exists({ checkFalsy: true }),
        body('category').isIn(Object.values(Category)),
        body('content').exists({ checkFalsy: true }),
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
    controller.postCommunityPost
);
router.get('/posts/:id', controller.getPostDetail);
router.patch('/posts/:id', controller.patchCommunityPost);
router.delete('/posts/:id', controller.deletePost);
router.post('/posts/:id/comment', controller.postComment);
router.patch('/posts/:id/comment', controller.patchComment);
router.delete('/posts/:id/comment', controller.deleteComment);
router.post(
    '/posts/:id/report',
    [
        body('userId').exists({ checkFalsy: true }),
        body('reason').isIn(Object.values(ReportReason)),
        middleware.validator,
    ],
    controller.postReport
);

router.get('/policy/:id', controller.getPolicyDetail);
router.put(
    '/custom/policy',
    [
        body('id').exists({ checkFalsy: true }),
        body('age').isLength({ min: 8, max: 8 }),
        body('workStatus').isIn(Object.values(WorkStatus)),
        body('companyScale').isIn(Object.values(CompanyScale)),
        body('medianIncome').isIn(Object.values(MedianIncome)),
        body('annualIncome').isIn(Object.values(AnnualIncome)),
        body('asset').isIn(Object.values(Asset)),
        body('hasHouse').isIn(Object.values(HasHouse)),
        body('isHouseOwner').isIn(Object.values(IsHouseOwner)),
        body('maritalStatus').isIn(Object.values(MaritalStatus)),
        middleware.validator,
    ],
    controller.getFilteredPolicyList
);

router.post(
    '/custom/policy',
    [
        body('id').exists({ checkFalsy: true }),
        body('age').isLength({ min: 8, max: 8 }),
        body('workStatus').isIn(Object.values(WorkStatus)),
        body('companyScale').isIn(Object.values(CompanyScale)),
        body('medianIncome').isIn(Object.values(MedianIncome)),
        body('annualIncome').isIn(Object.values(AnnualIncome)),
        body('asset').isIn(Object.values(Asset)),
        body('hasHouse').isIn(Object.values(HasHouse)),
        body('isHouseOwner').isIn(Object.values(IsHouseOwner)),
        body('maritalStatus').isIn(Object.values(MaritalStatus)),
        middleware.validator,
    ],
    controller.postFilteredPolicyList
);

router.post(
    '/question',
    [
        body('userId').exists({ checkFalsy: true }),
        body('content').exists({ checkFalsy: true }),
        body('email').isEmail(),
        middleware.validator,
    ],
    controller.postQuestion
);
router.post(
    '/policy/like',
    [
        body('userId').exists({ checkFalsy: true }),
        body('policyId').exists({ checkFalsy: true }),
        middleware.validator,
    ],
    controller.likePolicy
);
router.get('/notice', controller.getNotice);

router.use((error, req, res, next) => {
    res.status(400).json({
        success: false,
        error: {
            code: error.name,
            message: error.message,
        },
    });
});

export default router;
