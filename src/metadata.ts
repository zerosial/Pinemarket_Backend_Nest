/* eslint-disable */
export default async () => {
    const t = {
        ["./users/dto/response-user-dto"]: await import("./users/dto/response-user-dto"),
        ["./users/models/user.model"]: await import("./users/models/user.model")
    };
    return { "@nestjs/swagger/plugin": { "models": [[import("./posts/dto/pagenation-query.dto"), { "PaginationQueryDto": { page: { required: false, type: () => Number, default: 1, minimum: 1 }, limit: { required: false, type: () => Number, default: 10, minimum: 1 }, query: { required: false, type: () => String }, orderBy: { required: false, type: () => String }, direction: { required: false, type: () => Object, default: "asc" } } }]], "controllers": [[import("./app.controller"), { "AppController": { "getHello": { type: String }, "getHelloName": { type: String } } }], [import("./auth/auth.controller"), { "AuthController": { "signup": {}, "login": {}, "refreshToken": {}, "logout": {}, "getUser": { type: Object } } }], [import("./users/users.controller"), { "UserController": { "getProfile": { type: t["./users/dto/response-user-dto"].UserResponseDto }, "updateUser": { type: Object }, "changePassword": { type: Object } } }], [import("./posts/posts.controller"), { "PostsController": { "createPost": { type: Object }, "getPublishedPosts": {}, "getUserPosts": { type: [Object] }, "getPost": { type: Object } } }]] }, "@nestjs/graphql/plugin": { "models": [[import("./auth/dto/signup.input"), { "SignupInput": { email: {}, password: {}, username: { nullable: true } } }], [import("./auth/models/token.model"), { "Token": { accessToken: {}, refreshToken: {} } }], [import("./common/models/base.model"), { "BaseModel": { id: {}, createdAt: {}, updatedAt: {} } }], [import("./posts/models/post.model"), { "Post": { title: {}, content: { nullable: true }, published: {}, imgUrl: { nullable: true }, author: { nullable: true } } }], [import("./users/models/user.model"), { "User": { email: {}, username: { nullable: true }, role: {}, posts: { nullable: true } } }], [import("./auth/models/auth.model"), { "Auth": { user: { type: () => t["./users/models/user.model"].User } } }], [import("./auth/dto/login.input"), { "LoginInput": { email: {}, password: {} } }], [import("./auth/dto/refresh-token.input"), { "RefreshTokenInput": { token: {} } }], [import("./users/dto/change-password.input"), { "ChangePasswordInput": { oldPassword: {}, newPassword: {} } }], [import("./users/dto/update-user.input"), { "UpdateUserInput": { username: { nullable: true } } }], [import("./common/pagination/pagination.args"), { "PaginationArgs": { skip: { nullable: true, type: () => Number }, after: { nullable: true, type: () => String }, before: { nullable: true, type: () => String }, first: { nullable: true, type: () => Number }, last: { nullable: true, type: () => Number } } }], [import("./posts/args/post-id.args"), { "PostIdArgs": { postId: { type: () => String } } }], [import("./posts/args/user-id.args"), { "UserIdArgs": { userId: { type: () => String } } }], [import("./common/pagination/page-info.model"), { "PageInfo": { endCursor: { nullable: true }, hasNextPage: {}, hasPreviousPage: {}, startCursor: { nullable: true } } }], [import("./posts/models/post-connection.model"), { "PostConnection": {} }], [import("./posts/dto/post-order.input"), { "PostOrder": { field: {} } }], [import("./posts/dto/createPost.input"), { "CreatePostInput": { content: {}, title: {} } }]] } };
};