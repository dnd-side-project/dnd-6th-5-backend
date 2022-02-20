/**
 * @swagger
 * paths:
 *  /posts:
 *      post:
 *          description: create community post
 *          tags: [Posts]
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/CreatePost'
 *          responses:
 *              200:
 *                  description: success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              properties:
 *                                  success:
 *                                      type: boolean
 *                                  data:
 *                                      type: object
 */
