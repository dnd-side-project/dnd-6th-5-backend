/**
 * @swagger
 * tags:
 *   name: Question
 *   description: 문의
 */

/**
 * @swagger
 * paths:
 *  /question:
 *      post:
 *          description: 특정 user의 문의 내용을 저장합니다.
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
 *          tags: [Question]
 *          requestBody:
 *            required: true
 *            description: |
 *              ### 변경할 상태 정보입니다.</br>
 *              - userId - 문의하는 user의 id값입니다.</br>
 *              - title - 문의 제목입니다..</br>
 *              - content - 문의 내용입니다.</br>
 *              - email - 답변을 받을 email주소 입니다. </br>
 *            content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                    userId:
 *                      type: string
 *                    title:
 *                      type: string
 *                    content:
 *                      type: string
 *                    email:
 *                      type: string
 *                  example:
 *                    "userId": "7"
 *                    "title": "문의 제목입니다."
 *                    "content": "문의 내용입니다."
 *                    "email": "ekdan9172@naver.com"
 *          responses:
 *              200:
 *                  description: 특정 user를 필터링값을 성공적으로 변경했을 경우 다음 결과가 반환됩니다.
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
 *                                    newQuestion:
 *                                      $ref: "#/components/schemas/Question"
 */
