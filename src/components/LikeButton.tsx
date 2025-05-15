"use client";

import { FriendLike } from "../mock/types";

function formatLikeText(
  totalLikeCount: number,
  isLikedByUser: boolean,
  friendLikes: FriendLike[],
) {
  const friendNames = friendLikes.map((like) => like.name).join(", ");
  if (isLikedByUser) {
    return `You, ${friendNames} and ${
      totalLikeCount - friendLikes.length - 1
    } others like this`;
  }
  return `${friendNames} and ${
    totalLikeCount - friendLikes.length
  } others like this`;
}

export function LikeButton({
  totalLikeCount,
  isLikedByUser,
  friendLikes,
}: {
  totalLikeCount: number;
  isLikedByUser: boolean;
  friendLikes: FriendLike[];
}) {
  let buttonText = "Like";
  if (totalLikeCount > 0) {
    buttonText = formatLikeText(totalLikeCount, isLikedByUser, friendLikes);
  }
  return <button className={isLikedByUser ? "liked" : ""}>{buttonText}</button>;
}
