/**
 * @swagger
 * paths:
 *  /posts/{pk}/comment:
 *      post:
 *          description: create comment to particular post
 *          tags: [Posts]
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Comment'
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
 *                              properties:
 *                                  success:
 *                                      type: boolean
 *                                  data:
 *                                      type: string
 */
