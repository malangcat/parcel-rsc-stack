"use server-entry";

import "../../client.tsx";
import { Activity } from "../../core/Activity";
import { getRecentPostIds } from "../../mock";
import { AppScreen } from "../../ui/AppScreen";
import { Post } from "../_Post/Post";
import { PostListClient } from "./page.client";

export async function PostList({
  searchParams,
}: {
  searchParams: {
    limit: string;
  };
}) {
  const limit = searchParams.limit ? parseInt(searchParams.limit) : 10;
  const postIds = await getRecentPostIds(limit);
  return (
    <Activity>
      <AppScreen>
        {postIds.map((postId) => (
          <Post key={postId} postId={postId} truncateContent={true} />
        ))}
        {/* submit시 기본 push, data-rsc-replace시 replace (client.tsx에서 처리) */}
        {/* Next.js의 Form처럼 한번 감싸서 쓰면 될듯? */}
        <form data-rsc-replace>
          <select name="limit" defaultValue={limit}>
            <option value="">None</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
          <button type="submit">Submit</button>
        </form>
        <a href="/sheet">Sheet</a>
        <PostListClient />
      </AppScreen>
    </Activity>
  );
}
