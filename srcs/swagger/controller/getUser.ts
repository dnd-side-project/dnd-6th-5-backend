/**
 * @swagger
 * tags:
 *   name: User
 *   description: 유저
 */

/**
 * @swagger
 * /user:
 *  get:
 *      description: get all users
 *      tags: [User]
 *      responses:
 *          200:
 *              description: success
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: "#/components/schemas/User"
 *          400:
 *              description: No user in DB
 *          401:
 *              description: Authentication Error
 */

/**
 * @swagger
 * /user/{userId}:
 *  get:
 *      description: 특정 user의 필터링값을 변경합니다.
 *      parameters:
 *      - in: header
 *        name: access_token
 *        type: string
 *        required: true
 *        description: 로그인하면서 발급받은 access_token
 *      - in: header
 *        name: platform
 *        type: string
 *        required: true
 *        description: 로그인하면서 발급받은 platform값
 *      - in: path
 *        name: userId
 *        type: string
 *        required: true
 *        description: 특정 user의 userId값
 *      tags: [User]
 *      responses:
 *          200:
 *              description: 특정 user를 subject 랜덤 매칭 대기열에 성공적으로 추가하였을 경우 다음 결과가 반환됩니다.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                            success:
 *                              type: boolean
 *                            data:
 *                              type: object
 *                              properties:
 *                                user:
 *                                  $ref: "#/components/schemas/UserEntity"
 *          400:
 *              description: |
 *                오류가 발생해 특정 user를 subject 랜덤 매칭 대기열에 추가하지 못했을 경우 다음 결과가 반환됩니다.</br></br>
 *                -오류 예시</br>
 *                - 존재하지 않는 userID가 들어온 경우 <br>
 *                - No user in DB <br>
 *              content:
 *                  application/json:
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
 *                              code: Error
 *                              message: This userID does not exist.
 *          401:
 *              description: Authentication Error |
 *                user인증에 실패했을 경우 해당 오류가 반환됩니다.</br></br>
 *                -오류 예시</br>
 *                - access_token or platform을 헤더값에 넣지 않고 요청을 보낸경우 <br>
 *                - 만료되거나 올바르지 않은 형식의 access_token을 헤더에 넣어 보낸 경우 <br>
 *                - platform값이 naver, kakao를 제외한 값인 경우
 *              content:
 *                  application/json:
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
 *                              code: authentication
 *                              message: The value of headers.access_token is not valid.
 */

/**
 * @swagger
 * /user/nickname:
 *  patch:
 *      description: 특정 user의 nickname값을 변경합니다.
 *      parameters:
 *      - in: header
 *        name: access_token
 *        type: string
 *        required: true
 *        description: 로그인하면서 발급받은 access_token
 *      - in: header
 *        name: platform
 *        type: string
 *        required: true
 *        description: 로그인하면서 발급받은 platform값
 *      tags: [User]
 *      requestBody:
 *        required: true
 *        description: |
 *          ### 변경할 상태 정보입니다.</br>
 *          - id - nickname을 변경할 user의 id값입니다.</br>
 *          - nickname - 변경될 nickname값입니다.</br>
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: string
 *                nickname:
 *                  type: string
 *              example:
 *                "id": "2"
 *                "nickname": "kiwi"
 *      responses:
 *          200:
 *              description: 특정 user를 subject 랜덤 매칭 대기열에 성공적으로 추가하였을 경우 다음 결과가 반환됩니다.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                            success:
 *                              type: boolean
 *                            data:
 *                              type: object
 *                              properties:
 *                                user:
 *                                  $ref: "#/components/schemas/UserEntity"
 *          400:
 *              description: |
 *                오류가 발생해 특정 user를 subject 랜덤 매칭 대기열에 추가하지 못했을 경우 다음 결과가 반환됩니다.</br></br>
 *                -오류 예시</br>
 *                - 존재하지 않는 userID가 들어온 경우 <br>
 *                - No user in DB <br>
 *              content:
 *                  application/json:
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
 *                              code: Error
 *                              message: This userID does not exist.
 *          401:
 *              description: Authentication Error |
 *                user인증에 실패했을 경우 해당 오류가 반환됩니다.</br></br>
 *                -오류 예시</br>
 *                - access_token or platform을 헤더값에 넣지 않고 요청을 보낸경우 <br>
 *                - 만료되거나 올바르지 않은 형식의 access_token을 헤더에 넣어 보낸 경우 <br>
 *                - platform값이 naver, kakao를 제외한 값인 경우
 *              content:
 *                  application/json:
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
 *                              code: authentication
 *                              message: The value of headers.access_token is not valid.
 */

/**
 * @swagger
 * /user:
 *  patch:
 *      description: 특정 user의 필터링값을 변경합니다.
 *      parameters:
 *      - in: header
 *        name: access_token
 *        type: string
 *        required: true
 *        description: 로그인하면서 발급받은 access_token
 *      - in: header
 *        name: platform
 *        type: string
 *        required: true
 *        description: 로그인하면서 발급받은 platform값
 *      tags: [User]
 *      requestBody:
 *        required: true
 *        description: |
 *          ### 변경할 상태 정보입니다.</br>
 *          - id - nickname을 변경할 user의 id값입니다.</br>
 *          - age - 변경될 age값입니다. `yyyymmdd`형식으로 입력합니다.</br>
 *          - maritalStatus - 변경될 nickname값입니다.</br>
 *          - workStatus - 변경될 workStatus값입니다.</br>
 *          - companyScale - 변경될 companyScale값입니다.</br>
 *          - medianIncome - 변경될 medianIncome값입니다.</br>
 *          - annualIncome - 변경될 annualIncome값입니다.</br>
 *          - asset - 변경될 asset값입니다.</br>
 *          - isHouseOwner - 변경될 isHouseOwner값입니다.</br>
 *          - hasHouse - 변경될 hasHouse값입니다.</br>
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: string
 *                nickname:
 *                  type: string
 *              example:
 *                "id": "7"
 *                "age": "19960605"
 *                "maritalStatus": "미혼"
 *                "workStatus": "재직자"
 *                "companyScale": "중소기업"
 *                "medianIncome": "100% 이하"
 *                "annualIncome": "외벌이 3.5천만원 이하"
 *                "asset": "2.92억원 이하"
 *                "isHouseOwner": "세대구성원"
 *                "hasHouse": "무주택자"
 *      responses:
 *          200:
 *              description: 특정 user를 subject 랜덤 매칭 대기열에 성공적으로 추가하였을 경우 다음 결과가 반환됩니다.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                            success:
 *                              type: boolean
 *                            data:
 *                              type: object
 *                              properties:
 *                                user:
 *                                  $ref: "#/components/schemas/UserEntity"
 *          400:
 *              description: |
 *                오류가 발생해 특정 user를 subject 랜덤 매칭 대기열에 추가하지 못했을 경우 다음 결과가 반환됩니다.</br></br>
 *                -오류 예시</br>
 *                - 존재하지 않는 userID가 들어온 경우 <br>
 *                - No user in DB <br>
 *              content:
 *                  application/json:
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
 *                              code: Error
 *                              message: This userID does not exist.
 *          401:
 *              description: Authentication Error |
 *                user인증에 실패했을 경우 해당 오류가 반환됩니다.</br></br>
 *                -오류 예시</br>
 *                - access_token or platform을 헤더값에 넣지 않고 요청을 보낸경우 <br>
 *                - 만료되거나 올바르지 않은 형식의 access_token을 헤더에 넣어 보낸 경우 <br>
 *                - platform값이 naver, kakao를 제외한 값인 경우
 *              content:
 *                  application/json:
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
 *                              code: authentication
 *                              message: The value of headers.access_token is not valid.
 */
