/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: 커뮤니티
 */

/**
 * @swagger
 * paths:
 *  /user/{userId}/posts:
 *      get:
 *          description: params.userId를 가진 유저가 차단하지 않은 유저의 모든 게시글 조회
 *          tags: [Posts]
 *          parameters:
 *              - in: path
 *                name: userId
 *                type: number
 *                required: true
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
 *  /user/{userId}/posts/{pk}:
 *      get:
 *          description: get one post detail
 *          tags: [Posts]
 *          parameters:
 *              - in: path
 *                name: pk
 *                type: number
 *                required: true
 *              - in: path
 *                name: userId
 *                type: number
 *                required: true
 *          responses:
 *              200:
 *                  description: 특정 post의 정보를 성공적으로 조회하였을 경우 다음 결과가 반환됩니다. 유저가 차단한 댓글은 조회되지 않습니다.
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
 *      delete:
 *          description: get one post detail
 *          tags: [Posts]
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
 *                  description: 특정 post를 성공적으로 삭제하였을 경우 다음 결과가 반환됩니다.
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
 *                                      message:
 *                                          type: string
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
 *                    오류가 발생해 특정 post(게시글)에 대한 데이터를 성공적으로 삭제하지 못했을 경우 다음 결과가 반환됩니다.</br></br>
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
