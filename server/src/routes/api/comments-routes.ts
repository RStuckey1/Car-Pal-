import express from 'express';
import {
    getAllComments,
    getCommentsById,
    createComments,
    updateComments,
    deleteComments,
} from '../../controllers/commentsController';

const router = express.Router();

router.get('/', getAllComments);

router.get('/:id', getCommentsById);

router.post('/', createComments);

router.put('/:id', updateComments);

router.delete('/:id', deleteComments);

export { router as CommentsRouter };
