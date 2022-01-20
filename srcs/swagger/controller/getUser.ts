/**
 * @swagger
 * /user:
 *  get:
 *      description: get all users
 *      responses:
 *          200:
 *              description: success
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: "#/components/schemas/User"
 *          400:
 *              description: No user in DB
 *          401:
 *              description: Authentication Error
 */

/**
 * @swagger
 * /user/{userId}:
 *  get:
 *      description: get user same userId
 *      responses:
 *          200:
 *              description: success
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/User"
 *          400:
 *              description: No user in DB
 *          401:
 *              description: Authentication Error
 */
