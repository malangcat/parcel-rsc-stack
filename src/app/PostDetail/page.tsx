"use server-entry";

import "../../client";
import { Activity } from "../../core/Activity";
import { AppScreen } from "../../ui/AppScreen";
import { Document } from "../../ui/Document";
import { Post } from "../_Post/Post";

export async function PostDetail({
  params,
}: {
  params: {
    postId: string;
  };
}) {
  const postId = params.postId;

  return (
    <Document title="Post">
      <Activity id="post-detail">
        <AppScreen>
          <Post postId={postId} truncateContent={false} />
        </AppScreen>
      </Activity>
    </Document>
  );
}
