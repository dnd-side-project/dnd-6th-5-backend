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
 *                  description: 특정 user가 특정 policy를 성공적으로 찜(like)했을 경우 다음 결과가 반환됩니다.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              properties:
 *                                  success:
 *                                      type: boolean
 *                                  data:
 *                                      type: object
 *                                      properties:
 *                                          message:
 *                                              type: string
 *              400:
 *                  description: |
 *                    오류가 발생해 특정 policy(정책)를 찜하지 못했을 경우 다음 결과가 반환됩니다.</br></br>
 *                    -오류 예시</br>
 *                    - 존재하지 않는 policy pk가 들어온 경우 <br>
 *                    - No matching policy in db <br>
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
 *                                  message: No matching policy in db
 */
