/**
 * @swagger
 * paths:
 *  /policy/like:
 *      post:
 *          description: like or dislike policy
 *          tags: [Policy]
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Like'
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
 *              400:
 *                  description: No policy in DB
 */
