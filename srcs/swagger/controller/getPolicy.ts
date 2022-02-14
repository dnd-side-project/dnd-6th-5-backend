/**
 * @swagger
 * tags:
 *   name: Policy
 *   description: 정책
 */

/**
 * @swagger
 * paths:
 *  /policy:
 *      get:
 *          description: get all policy
 *          tags: [Policy]
 *          parameters:
 *              - in: query
 *                name: category
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
 *                                  $ref: "#/components/schemas/Policy"
 *              400:
 *                  description: No policy in DB
 */

/**
 * @swagger
 * paths:
 *  /policy/{pk}:
 *      get:
 *          description: get one policy detail
 *          tags: [Policy]
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
 *                              $ref: "#/components/schemas/PolicyDetail"
 *              404:
 *                  description: No matching policy in DB
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
