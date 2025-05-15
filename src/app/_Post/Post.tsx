import { LikeButton } from "../../components/LikeButton";
import { getFriendLikes, getPost } from "../../mock";
import { likePostAction, unlikePostAction } from "./actions";

export async function Post({
  postId,
  truncateContent,
}: {
  postId: string;
  truncateContent: boolean;
}) {
  const post = await getPost(postId);

  const postContent = truncateContent
    ? post.content.slice(0, 100) + "..."
    : post.content;

  return (
    <article>
      <h1>
        <a href={`/posts/${post.id}`}>{post.title}</a>
      </h1>
      <div>{postContent}</div>
      <p>by {post.author.name}</p>
      <section>
        <form action={post.isLikedByUser ? unlikePostAction : likePostAction}>
          <input type="hidden" name="postId" value={postId} />
          <PostLikeButton postId={postId} />
        </form>
      </section>
    </article>
  );
}

async function PostLikeButton({ postId }: { postId: string }) {
  const [post, friendLikes] = await Promise.all([
    getPost(postId),
    getFriendLikes(postId),
  ]);

  return (
    <LikeButton
      totalLikeCount={post.likeCount}
      isLikedByUser={post.isLikedByUser}
      friendLikes={friendLikes}
    />
  );
}
