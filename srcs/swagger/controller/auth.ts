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
 *                    오류가 발생해 spoon feed에 네이버 계정으로 성공적으로 소셜 로그인하지 못했을 경우 다음 결과가 반환됩니다.</br></br>
 *                    -오류 예시</br>
 *                    - header에 access_token or refresh_token을 넣지 않고 요청했을 경우 <br>
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
 *                                errors:
 *                                  msg: Invalid value
 *                                  param: refresh_token
 *                                  location: headers
 *              401:
 *                  description: |
 *                    오류가 발생해 spoon feed에 네이버 계정으로 성공적으로 소셜 로그인하지 못했을 경우 다음 결과가 반환됩니다.</br></br>
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
 */

/**
 * @swagger
 * paths:
 *  /login/kakao:
 *      get:
 *          description: spoon feed에 카카오 계정으로 소셜 로그인을 합니다.
 *          tags: [Auth]
 *          parameters:
 *              - in: header
 *                name: access_token
 *                required: true
 *                description: kakao api에서 발급받은 access_token
 *                schema:
 *                    type: string
 *              - in: header
 *                name: refresh_token
 *                required: true
 *                description: kakao api에서 발급받은 refresh_token
 *                schema:
 *                    type: string
 *          responses:
 *              200:
 *                  description: spoon feed에 kakao 계정으로 성공적으로 소셜 로그인하였을 경우 다음 결과가 반환됩니다. <br>
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
 *                    오류가 발생해 spoon feed에 kakao 계정으로 성공적으로 소셜 로그인하지 못했을 경우 다음 결과가 반환됩니다.</br></br>
 *                    -오류 예시</br>
 *                    - header에 access_tokne or refresh_token을 넣지 않고 요청했을 경우 <br>
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
 *                                errors:
 *                                  msg: Invalid value
 *                                  param: refresh_token
 *                                  location: headers
 *              401:
 *                  description: |
 *                    오류가 발생해 spoon feed에 kakao 계정으로 성공적으로 소셜 로그인하지 못했을 경우 다음 결과가 반환됩니다.</br></br>
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
 */

/**
 * @swagger
 * paths:
 *  /logout/naver:
 *      get:
 *          description: spoon feed에 네이버 계정으로 로그아웃 합니다.
 *          tags: [Auth]
 *          parameters:
 *              - in: header
 *                name: access_token
 *                required: true
 *                description: naver api에서 발급받은 access_token
 *                schema:
 *                    type: string
 *          responses:
 *              200:
 *                  description: spoon feed에 naver 계정으로 성공적으로 로그아웃하였을 경우 다음 결과가 반환됩니다. <br>
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
 *                                    id:
 *                                      type: number
 *              400:
 *                  description: |
 *                    오류가 발생해 spoon feed에 naver 계정으로 성공적으로 소셜 로그아웃하지 못했을 경우 다음 결과가 반환됩니다.</br></br>
 *                    -오류 예시</br>
 *                    - header에 access_token 넣지 않고 요청했을 경우 <br>
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
 *                                errors:
 *                                  msg: Invalid value
 *                                  param: access_token
 *                                  location: headers
 *              401:
 *                  description: |
 *                    인증 오류가 발생해 spoon feed에 naver 계정으로 성공적으로 소셜 로그아웃하지 못했을 경우 다음 결과가 반환됩니다.</br></br>
 *                    -오류 예시</br>
 *                    - 만료되거나 올바르지않은 access_token이 요청 헤더에 들어온 경우<br>
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
 */

/**
 * @swagger
 * paths:
 *  /logout/kakao:
 *      get:
 *          description: spoon feed에 kakao 계정으로 로그아웃 합니다.
 *          tags: [Auth]
 *          parameters:
 *              - in: header
 *                name: access_token
 *                required: true
 *                description: kakao api에서 발급받은 access_token
 *                schema:
 *                    type: string
 *          responses:
 *              200:
 *                  description: spoon feed에 kakao 계정으로 성공적으로 로그아웃하였을 경우 다음 결과가 반환됩니다. <br>
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
 *                                    id:
 *                                      type: number
 *              400:
 *                  description: |
 *                    오류가 발생해 spoon feed에 kakao 계정으로 성공적으로 소셜 로그아웃하지 못했을 경우 다음 결과가 반환됩니다.</br></br>
 *                    -오류 예시</br>
 *                    - header에 access_token 넣지 않고 요청했을 경우 <br>
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
 *                                errors:
 *                                  msg: Invalid value
 *                                  param: access_token
 *                                  location: headers
 *              401:
 *                  description: |
 *                    오류가 발생해 spoon feed에 kakao 계정으로 성공적으로 소셜 로그아웃하지 못했을 경우 다음 결과가 반환됩니다.</br></br>
 *                    -오류 예시</br>
 *                    - 만료되거나 올바르지않은 access_token이 요청 헤더에 들어온 경우<br>
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
 */

/**
 * @swagger
 * paths:
 *  /user/naver:
 *      delete:
 *          description: spoon feed에 네이버 계정으로 탈퇴 합니다.
 *          tags: [Auth]
 *          parameters:
 *              - in: header
 *                name: access_token
 *                required: true
 *                description: naver api에서 발급받은 access_token
 *                schema:
 *                    type: string
 *          responses:
 *              200:
 *                  description: spoon feed에 naver 계정으로 성공적으로 탈퇴하였을 경우 다음 결과가 반환됩니다. <br>
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
 *                                    id:
 *                                      type: number
 *              400:
 *                  description: |
 *                    오류가 발생해 spoon feed에 naver 계정으로 성공적으로 탈퇴하지 못했을 경우 다음 결과가 반환됩니다.</br></br>
 *                    -오류 예시</br>
 *                    - header에 access_token 넣지 않고 요청했을 경우 <br>
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
 *                                errors:
 *                                  msg: Invalid value
 *                                  param: access_token
 *                                  location: headers
 *              401:
 *                  description: |
 *                    인증 오류가 발생해 spoon feed에 naver 계정으로 성공적으로 탈퇴하지 못했을 경우 다음 결과가 반환됩니다.</br></br>
 *                    -오류 예시</br>
 *                    - 만료되거나 올바르지않은 access_token이 요청 헤더에 들어온 경우<br>
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
 */

/**
 * @swagger
 * paths:
 *  /user/kakao:
 *      delete:
 *          description: spoon feed에 가입된 kakao 계정을 탈퇴합니다.
 *          tags: [Auth]
 *          parameters:
 *              - in: header
 *                name: access_token
 *                required: true
 *                description: kakao api에서 발급받은 access_token
 *                schema:
 *                    type: string
 *          responses:
 *              200:
 *                  description: spoon feed에 kakao 계정으로 성공적으로 탈퇴하였을 경우 다음 결과가 반환됩니다. <br>
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
 *                                    id:
 *                                      type: number
 *              400:
 *                  description: |
 *                    오류가 발생해 spoon feed에 kakao 계정으로 성공적으로 탈퇴하지 못했을 경우 다음 결과가 반환됩니다.</br></br>
 *                    -오류 예시</br>
 *                    - header에 access_token 넣지 않고 요청했을 경우 <br>
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
 *                                errors:
 *                                  msg: Invalid value
 *                                  param: access_token
 *                                  location: headers
 *              401:
 *                  description: |
 *                    오류가 발생해 spoon feed에 kakao 계정으로 성공적으로 소셜 계정을 탈퇴하지 못했을 경우 다음 결과가 반환됩니다.</br></br>
 *                    -오류 예시</br>
 *                    - 만료되거나 올바르지않은 access_token이 요청 헤더에 들어온 경우<br>
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
 */

/**
 * @swagger
 * paths:
 *  /token:
 *      get:
 *          description: request header에 refresh_token값을 담아 응답을 받고 갱신된 access_token과 refresh_token을 응답의 header으로 받습니다.
 *          tags: [Auth]
 *          parameters:
 *              - in: header
 *                name: refresh_token
 *                required: true
 *                description: 발급받아 저장해뒀던 refresh_token
 *                schema:
 *                    type: string
 *              - in: header
 *                name: platform
 *                required: true
 *                description: 해당 user가 로그인했던 소셜 플랫폼(kaka, naver 중 하나)
 *                schema:
 *                    type: string
 *          responses:
 *              200:
 *                  description: access_token과 refresh_token을 성공적으로 갱신하였을 경우 다음 결과가 반환됩니다. <br>
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                success:
 *                                  type: boolean
 *              400:
 *                  description: |
 *                    오류가 발생해 access_token과 refresh_token을 성공적으로 갱신하지 못했을 경우 다음 결과가 반환됩니다.</br></br>
 *                    -오류 예시</br>
 *                    - header에 refresh_token 넣지 않고 요청했을 경우 <br>
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
 *                                errors:
 *                                  msg: Invalid value
 *                                  param: refresh_token
 *                                  location: headers
 *              401:
 *                  description: |
 *                    인증 오류가 발생해 access_token과 refresh_token을 성공적으로 갱신하지 못했을 경우 다음 결과가 반환됩니다.</br></br>
 *                    -오류 예시</br>
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
 */
