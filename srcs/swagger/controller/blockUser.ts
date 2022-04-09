/**
 * @swagger
 * paths:
 *  /user/block:
 *      post:
 *          description: block or unblock certain user
 *          tags: [User]
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Block'
 *          responses:
 *              200:
 *                  description: 특정 user가 또 다른 특정 user를 성공적으로 차단 혹은 차단해제 했을 경우 다음 결과가 반환됩니다.
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
 *                    오류가 발생해 특정 user를 차단하지 못했을 경우 다음 결과가 반환됩니다.</br></br>
 *                    -오류 예시</br>
 *                    - 존재하지 않는 user pk가 들어온 경우 <br>
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
 *                                  message: Could not find any entity of type \"User\" matching
 */
