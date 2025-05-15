"use server-entry";

import "../../client";
import { Activity } from "../../core/Activity";
import { getRecentPostIds } from "../../mock";
import { AppScreen } from "../../ui/AppScreen";
import { Document } from "../../ui/Document";
import { Post } from "../_Post/Post";

export async function PostList() {
  const postIds = await getRecentPostIds();
  return (
    <Document title="Post List">
      <Activity id="post-list">
        <AppScreen>
          {postIds.map((postId) => (
            <Post key={postId} postId={postId} truncateContent={true} />
          ))}
        </AppScreen>
      </Activity>
    </Document>
  );
}
