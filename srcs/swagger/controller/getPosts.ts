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
