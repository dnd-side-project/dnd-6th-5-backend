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
 *                  description: 커뮤니티 리스트를 성공적으로 조회하였을 경우 다음 결과가 반환됩니다.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                success:
 *                                  type: boolean
 *                                data:
 *                                  type: object
 *                                  properties:
 *                                      post:
 *                                          type: array
 *                                          items:
 *                                              oneOf:
 *                                              - $ref: "#/components/schemas/Post"
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
 *                  description: 특정 post의 정보를 성공적으로 조회하였을 경우 다음 결과가 반환됩니다.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                success:
 *                                  type: boolean
 *                                data:
 *                                  type: object
 *                                  properties:
 *                                      post:
 *                                          type: object
 *                                          $ref: "#/components/schemas/PostDetail"
 *                                      comment:
 *                                          type: array
 *                                          items:
 *                                              oneOf:
 *                                              - $ref: "#/components/schemas/Comment"
 *              404:
 *                  description: |
 *                    오류가 발생해 특정 post(게시글)에 대한 데이터를 성공적으로 조회하지 못했을 경우 다음 결과가 반환됩니다.</br></br>
 *                    -오류 예시</br>
 *                    - 존재하지 않는 pk가 들어온 경우 <br>
 *                    - No matching post in db <br>
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                success:
 *                                  type: boolean
 *                                error:
 *                                  properties:
 *                                   code:
 *                                     type: string
 *                                   message:
 *                                     type: string
 *                              example:
 *                                success: false
 *                                error:
 *                                  code: Error
 *                                  message: No matching post in db
 */
