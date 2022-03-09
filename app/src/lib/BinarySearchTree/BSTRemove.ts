import BinarySearchTree from '.';
import board from '../../App/Canvas/Board';
import { BTNodeSetLeft, BTNodeSetRight, BTNodeUnsetLeft, BTNodeUnsetRight } from '../BinaryTree/utils';
import Color from '../Colors';
import BSTSearch from './BSTSearch';
import {
  BSTMinimum,
  BSTTransplant,
} from './utils';

const SUCCESS = Color.Green;
const UNSUCCESS = Color.Red;

async function BSTRemove(t: BinarySearchTree, value: number) {
  await BSTSearch(t, value);
  let [found, ptr] = t.search(value);

  if (found) {
    ptr.color = UNSUCCESS;
    await board.render();
    await board.pause();

    if (ptr.left === undefined) {
      if (ptr.right) {
        ptr.right.color = SUCCESS;
        await board.render();
        await board.pause();
      }

      await BSTTransplant(t, ptr, ptr.right);
    } else if (ptr.right === undefined) {
      if (ptr.left) {
        ptr.left.color = SUCCESS;
        await board.render();
        await board.pause();
      }

      await BSTTransplant(t, ptr, ptr.left);
    } else {
      await BSTMinimum(ptr.right);

      let y = t.minimum(ptr.right);
      let yTree = new BinarySearchTree(0);
      yTree.moveTo(y.box.x, y.box.y);
      yTree.root = y;

      if (y.parent !== ptr) {
        await BSTTransplant(t, y, y.right);

        board.add(yTree);
        let ptrRight = ptr.right;
        await BTNodeUnsetRight(ptr);
        await BTNodeSetRight(y, ptrRight);
        y.right.parent = y;
      }

      await BTNodeSetLeft(y, await BTNodeUnsetLeft(ptr));
      await BSTTransplant(t, ptr, y);
      y.left.parent = y;

      board.remove(yTree);

      y.color = Color.Transparent;
      await board.render();
      await board.pause();
    }

    await board.render();
    await board.pause();
  } else {
    // Node with value not found
  }
}

export default BSTRemove;
