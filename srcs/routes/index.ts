import { Router } from 'express';
import swaggerUI from 'swagger-ui-express';
import swaggerSpec from '../swagger/option';
import * as controller from '../controllers';
import * as middleware from '../middleware';
import { header, body } from 'express-validator';

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
router.post(
    '/policy/filter',
    [
        body('category').exists({ checkFalsy: true }),
        body('id').exists({ checkFalsy: true }),
        body('age').exists({ checkFalsy: true }),
        body('maritalStatus').exists({ checkFalsy: true }),
        body('workStatus').exists({ checkFalsy: true }),
        body('companyScale').exists({ checkFalsy: true }),
        body('medianIncome').exists({ checkFalsy: true }),
        body('annualIncome').exists({ checkFalsy: true }),
        body('asset').exists({ checkFalsy: true }),
        body('isHouseOwner').exists({ checkFalsy: true }),
        body('hasHouse').exists({ checkFalsy: true }),
        middleware.validator,
    ],
    controller.getFilteredPolicyList
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

router.use(middleware.isAuth);
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
        body('age').exists({ checkFalsy: true }),
        body('maritalStatus').isIn(['미혼', '기혼']),
        body('workStatus').isIn(['재직자', '미취업자']),
        body('companyScale').isIn(['중소기업', '중견기업', '자영업자', '(예비)창업자', '해당없음']),
        body('medianIncome').isIn([
            '30% 이하',
            '40% 이하',
            '45% 이하',
            '50% 이하',
            '72% 이하',
            '100% 이하',
            '해당없음',
            '미공개',
        ]),
        body('annualIncome').isIn([
            '부부합산 2천만원 이하',
            '부부합산 5천만원 이하',
            '외벌이 3천만원 이하',
            '외벌이 3.5천만원 이하',
            '해당없음',
            '미공개',
        ]),
        body('asset').isIn(['2.92억원 이하', '2.92억원 초과', '미공개']),
        body('isHouseOwner').isIn(['세대주 혹은 예비세대주', '세대구성원', '미공개']),
        body('hasHouse').isIn(['무주택자', '유주택자', '미공개']),
        middleware.validator,
    ],
    controller.patchUserNickname
);

export default router;
