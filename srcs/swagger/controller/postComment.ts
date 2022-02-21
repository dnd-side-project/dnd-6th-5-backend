/**
 * @swagger
 * paths:
 *  /posts/{pk}/comment:
 *      post:
 *          description: 커뮤니티 게시글에 댓글을 작성합니다.
 *          parameters:
 *          - in: header
 *            name: access_token
 *            type: string
 *            required: true
 *            description: 로그인하면서 발급받은 access_token
 *          - in: header
 *            name: platform
 *            type: string
 *            required: true
 *            description: 로그인하면서 발급받은 platform값
 *          - in: path
 *            name: pk
 *            type: number
 *            description: 댓글을 작성할 게시글의 pk값
 *            required: true
 *          tags: [Posts]
 *          requestBody:
 *              required: true
 *              description: |
 *                ### 댓글 작성에 필요한 입력 정보입니다.</br>
 *                - userId - 댓글 작성자의 id(pk)값입니다.
 *                - content - 댓글 내용입니다.
 *              content:
 *                  application/json:
 *                      schema:
 *                          properties:
 *                              userId:
 *                                  type: number
 *                              content:
 *                                  type: string
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
 *                                      type: object
 *                                      properties:
 *                                          message:
 *                                              type: string
 *              400:
 *                  description: |
 *                    오류가 발생해 게시글 작성에 실패했을 경우 다음 결과가 반환됩니다.</br></br>
 *                    -오류 예시</br>
 *                    - 존재하지 않는 userID가 들어온 경우 <br>
 *                  content:
 *                    application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                            success:
 *                              type: boolean
 *                            error:
 *                              properties:
 *                               code:
 *                                 type: string
 *                               message:
 *                                 type: string
 *                          example:
 *                            success: false
 *                            error:
 *                              code: EntityNotFoundError
 *                              message: Could not find any entity of type \"User\" matching
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
 */
