"use server";

import { likePost, unlikePost } from "../../mock";

export async function likePostAction(formData: FormData) {
  console.log("likePostAction", formData);
  const postId = formData.get("postId");
  if (!postId) {
    throw new Error("Post ID is required");
  }
  await likePost(postId as string);
}

export async function unlikePostAction(formData: FormData) {
  console.log("unlikePostAction", formData);
  const postId = formData.get("postId");
  if (!postId) {
    throw new Error("Post ID is required");
  }
  await unlikePost(postId as string);
}
