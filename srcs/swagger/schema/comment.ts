/**
 * @swagger
 *  components:
 *      schemas:
 *          Comment:
 *              type: object
 *              properties:
 *                  id:
 *                      type: number
 *                  content:
 *                      type: string
 *                  commenter:
 *                      type: string
 *                  createdAt:
 *                      type: string
 *                  updatedAt:
 *                      type: string
 *                  isModified:
 *                      type: boolean
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          UserComment:
 *              type: object
 *              properties:
 *                  user_id:
 *                      type: number
 *                  post_id:
 *                      type: number
 *                  comment_id:
 *                      type: number
 *                  title:
 *                      type: string
 *                  content:
 *                      type: string
 *                  createdAt:
 *                      type: string
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          PatchComment:
 *              type: object
 *              properties:
 *                  userId:
 *                      type: number
 *                  commentId:
 *                      type: number
 *                  content:
 *                      type: string
 *                  createdAt:
 *                      type: string
 *                  updatedAt:
 *                      type: string
 */
