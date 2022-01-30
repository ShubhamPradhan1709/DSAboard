import { Router } from 'express'; 
import binarySearchTree from './binarysearchtree';
import nodeArrayRouter from './nodearray';

const router = Router();

router.use('/nodearray', nodeArrayRouter);
router.use('/binarysearchtree', binarySearchTree);

export default router;

