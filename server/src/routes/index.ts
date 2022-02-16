import { Router } from 'express'; 
import binarySearchTree from './binarysearchtree';
import arrayRouter from './array';

const router = Router();

router.use('/array', arrayRouter);
router.use('/binarysearchtree', binarySearchTree);

export default router;

