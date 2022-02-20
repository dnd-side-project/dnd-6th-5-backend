/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: 로그인, 인증
 */

/**
 * @swagger
 * paths:
 *  /login/naver:
 *      get:
 *          description: spoon feed에 네이버 계정으로 소셜 로그인을 합니다.
 *          tags: [Auth]
 *          parameters:
 *              - in: header
 *                name: access_token
 *                required: true
 *                description: naver api에서 발급받은 access_token
 *                schema:
 *                    type: string
 *              - in: header
 *                name: refresh_token
 *                required: true
 *                description: naver api에서 발급받은 refresh_token
 *                schema:
 *                    type: string
 *          responses:
 *              200:
 *                  description: spoon feed에 네이버 계정으로 성공적으로 소셜 로그인하였을 경우 다음 결과가 반환됩니다. <br>
 *                               응답의 header에 access_token과 refresh_token, platform을 담아 반환합니다.</br>
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
 *                                    user:
 *                                      $ref: "#/components/schemas/UserToken"
 *              400:
 *                  description: |
 *                    오류가 발생해 spoon feed에 네이버 계정으로 성공적으로 소셜 로그인하지 못했을 경우 다음 결과가 반환됩니다.</br>
 *                    -오류 예시</br>
 *                    - 만료되거나 올바르지않은 access_token이 요청 헤더에 들어온 경우<br>
 *                    - 만료되거나 올바르지않은 refresh_token이 요청 헤더에 들어온 경우<br>
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
 *                                  error: invalid_grant
 *                                  error_description: expired_or_invalid_refresh_token
 *                                  error_code: KOE322
 *              401:
 *                  description: Authentication Error |
 *                    user인증에 실패했을 경우 해당 오류가 반환됩니다.</br></br>
 *                    - 오류 예시</br>
 *                    - access_token or platform을 헤더값에 넣지 않고 요청을 보낸경우 <br>
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
 *                                  code: -401
 *                                  message: this access token does not exist
 */
