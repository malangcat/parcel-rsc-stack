import { PostDetail } from "./app/PostDetail/page";
import { PostList } from "./app/PostList/page";
import { route } from "./core/route";

export const routes = [
  route("/", PostList),
  route("/posts/:postId", PostDetail),
];
