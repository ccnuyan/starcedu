import { Router } from 'express';

import auth from '../authMiddleware';
import me from './me';
import signin from './signin';
import signup from './signup';
import signout from './signout';
import update_password from './update_password';

const router = Router();

router.get('/me', auth, me);
router.post('/signin', signin);
router.post('/signup', signup);
router.get('/signout', signout);
router.put('/update_password', auth, update_password);

export default router;
