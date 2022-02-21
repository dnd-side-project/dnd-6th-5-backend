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
 *                description: 카테고리 선택 (전체 / 주거 / 금융)
 *                type: string
 *                required: true
 *          responses:
 *              200:
 *                  description: 정책 리스트를 성공적으로 조회하였을 경우 다음 결과가 반환됩니다.
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
 *                                              - $ref: "#/components/schemas/Policy"
 */

/**
 * @swagger
 * paths:
 *  /policy/{pk}:
 *      get:
 *          description: get one policy detail
 *          tags: [Policy]
 *          parameters:
 *              - in: header
 *                name: access_token
 *                type: string
 *                required: true
 *                description: 로그인하면서 발급받은 access_token
 *              - in: header
 *                name: platform
 *                type: string
 *                required: true
 *                description: 로그인하면서 발급받은 platform값
 *              - in: path
 *                name: pk
 *                type: number
 *                required: true
 *          responses:
 *              200:
 *                  description: 특정 policy의 정보를 성공적으로 조회하였을 경우 다음 결과가 반환됩니다.
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
 *                                          $ref: "#/components/schemas/PolicyDetail"
 *              401:
 *                  description: Authentication Error |
 *                    user인증에 실패했을 경우 해당 오류가 반환됩니다.</br></br>
 *                    -오류 예시</br>
 *                    - access_token or platform을 헤더값에 넣지 않고 요청을 보낸경우 <br>
 *                    - 만료되거나 올바르지 않은 형식의 access_token을 헤더에 넣어 보낸 경우 <br>
 *                    - platform값이 naver, kakao를 제외한 값인 경우
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                success:
 *                                  type: boolean
 *                              error:
 *                                properties:
 *                                  code:
 *                                    type: string
 *                                  message:
 *                                    type: string
 *                              example:
 *                                success: false
 *                                error:
 *                                  code: authentication
 *                                  message: The value of headers.access_token is not valid.
 *              404:
 *                  description: |
 *                    오류가 발생해 특정 policy(정책)에 대한 데이터를 성공적으로 조회하지 못했을 경우 다음 결과가 반환됩니다.</br></br>
 *                    -오류 예시</br>
 *                    - 존재하지 않는 pk가 들어온 경우 <br>
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

/**
 * @swagger
 * paths:
 *  /policy/filter:
 *      post:
 *          description: policy filtering api
 *          tags: [Policy]
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Filter'
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
 *                  description: Bad request
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
