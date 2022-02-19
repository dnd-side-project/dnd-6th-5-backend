/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: 커뮤니티
 */

/**
 * @swagger
 * paths:
 *  /posts:
 *      get:
 *          description: get all posts
 *          tags: [Posts]
 *          responses:
 *              200:
 *                  description: success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: "#/components/schemas/Post"
 */

/**
 * @swagger
 * paths:
 *  /posts/{pk}:
 *      get:
 *          description: get one post detail
 *          tags: [Posts]
 *          parameters:
 *              - in: path
 *                name: pk
 *                schema:
 *                    type: number
 *          responses:
 *              200:
 *                  description: success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: "#/components/schemas/PostDetail"
 *              404:
 *                  description: No matching post in DB
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  success:
 *                                      type: string
 *                                  error:
 *                                      type: string
 */
