import BinarySearchTree from '.';
import board from '../../App/Canvas/Board';
import { BinaryTreeNode } from '../BinaryTree';
import { BTNodeSetLeft, BTNodeSetRight } from '../BinaryTree/utils';
import Color from '../Colors';

const PRIMARY = Color.Violet;
const SUCCESS = Color.Green;

async function BSTInsert(t: BinarySearchTree, value: number) {
  let par = t.root;
  let ptr = t.root;

  while (ptr !== undefined && ptr.value !== value) {
    par = ptr;

    ptr.color = PRIMARY;
    await board.render();
    await board.pause();

    ptr.color = Color.Transparent;
    await board.render();
    await board.pause();

    if (value < ptr.value) {
      ptr = ptr.left;
    } else if (value > ptr.value) {
      ptr = ptr.right;
    }
  }

  if (ptr === undefined) {
    if (value < par.value) {
      await BTNodeSetLeft(par, new BinaryTreeNode(value));
      ptr = par.left;
    } else if (value > par.value) {
      await BTNodeSetRight(par, new BinaryTreeNode(value));
      ptr = par.right;
    }
  }

  ptr.color = SUCCESS;
  await board.render();
  await board.pause();

  ptr.color = Color.Transparent;
  await board.render();
}

export default BSTInsert;
