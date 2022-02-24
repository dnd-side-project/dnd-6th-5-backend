/**
 * @swagger
 * tags:
 *   name: Notice
 *   description: 공지사항
 */

/**
 * @swagger
 * paths:
 *  /notice:
 *      get:
 *          description: get all policy
 *          tags: [Notice]
 *          responses:
 *              200:
 *                  description: 공지사항 리스트를 성공적으로 조회하였을 경우 다음 결과가 반환됩니다.
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
 *                                      policy:
 *                                          type: array
 *                                          items:
 *                                              oneOf:
 *                                              - $ref: "#/components/schemas/Notice"
 *              400:
 *                  description: |
 *                    오류가 발생해 공지사항 리스트에 대한 데이터를 성공적으로 조회하지 못했을 경우 다음 결과가 반환됩니다.</br></br>
 *                    -오류 예시</br>
 *                    - 존재하지 않는 category가 들어온 경우 <br>
 *                    - Invalid Category <br>
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
 *                                  message: Invalid Category
 */
