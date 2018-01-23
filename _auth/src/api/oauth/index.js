import { Router } from 'express';

import unlink from './3rd_party_unlink';
import signout from './3rd_party_signout';
import tenant_signout from './tenant_signout';
import auth from '../authMiddleware';

const router = Router();

// these are for 3rd party authentication providers
router.get('/3rd_party_signout', signout);
router.put('/3rd_party_unlink', auth, unlink);

// these are for tennants
router.get('/tenant_signout', tenant_signout);

export default router;
