/**
 * @swagger
 * paths:
 *  /posts/{pk}:
 *      patch:
 *          description: 커뮤니티 게시글을 수정합니다.
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
 *            required: true
 *          tags: [Posts]
 *          requestBody:
 *              required: true
 *              description: |
 *                ### 변경할 상태 정보입니다.</br>
 *                - userId - 게시글을 작성하는 user의 id값입니다.</br>
 *                - title - 게시글의 title값입니다.</br>
 *                - category - 게시글의 category값입니다.</br>
 *                - content - 게시글의 content값입니다.</br>
 *                - age - 게시글의 age값입니다. `yyyymmdd`형식으로 입력합니다.</br>
 *                - maritalStatus - 게시글의 maritalStatus값입니다.</br>
 *                - workStatus - 게시글의 workStatus값입니다.</br>
 *                - companyScale - 게시글의 companyScale값입니다.</br>
 *                - medianIncome - 게시글의 medianIncome값입니다.</br>
 *                - annualIncome - 게시글의 annualIncome값입니다.</br>
 *                - asset - 게시글의 asset값입니다.</br>
 *                - isHouseOwner - 게시글의 isHouseOwner값입니다.</br>
 *                - hasHouse - 게시글의 hasHouse값입니다.</br>
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/CreatePost'
 *          responses:
 *              200:
 *                  description: 게시글 수정에 성공했을 경우 다음 결과가 반환됩니다.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              properties:
 *                                  success:
 *                                    type: boolean
 *                                  data:
 *                                    type: object
 *                                    properties:
 *                                      post:
 *                                        $ref: "#/components/schemas/CreatePost"
 *              400:
 *                  description: |
 *                    오류가 발생해 게시글 수정에 실패했을 경우 다음 결과가 반환됩니다.</br></br>
 *                    -오류 예시</br>
 *                    - 존재하지 않는 postId가 들어온 경우 <br>
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
 *                              message: This post_id does not exist.
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
