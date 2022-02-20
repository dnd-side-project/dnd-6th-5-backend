/**
 * @swagger
 * paths:
 *  /posts/search:
 *      get:
 *          description: get all posts
 *          tags: [Posts]
 *          parameters:
 *              - in: query
 *                name: query
 *                schema:
 *                    type: string
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
