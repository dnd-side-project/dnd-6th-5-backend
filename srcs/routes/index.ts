import { Router } from 'express';
import swaggerUI from 'swagger-ui-express';
import swaggerSpec from '../swagger/option';

const router = Router();
/*
    Set your router, but must check order of router
*/
router.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
router.get('/', (req, res) => {
    res.json({ data: 'data' });
});
export default router;
