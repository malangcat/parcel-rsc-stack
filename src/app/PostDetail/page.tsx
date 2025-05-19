"use server-entry";

import { Activity } from "../../core/Activity";
import { AppScreen } from "../../ui/AppScreen";
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
    <Activity>
      <AppScreen>
        <Post postId={postId} truncateContent={false} />
      </AppScreen>
    </Activity>
  );
}
