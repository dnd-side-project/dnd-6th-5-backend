/**
 * @swagger
 * paths:
 *  /user/{userId}/posts/search:
 *      get:
 *          description: 검색하는 유저가 차단한 게시글을 제외한 커뮤니티 검색
 *          tags: [Posts]
 *          parameters:
 *              - in: query
 *                name: query
 *                description: 검색 키워드 query
 *                type: string
 *              - in: path
 *                name: userId
 *                description: 검색하는 user의 id값
 *                type: string
 *          responses:
 *              200:
 *                  description: 커뮤니티 검색 결과를 성공적으로 조회하였을 경우 다음 결과가 반환됩니다.</br>
 *                               검색 결과가 없을 시 빈 배열[] 로 출력됩니다.
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
