export interface Post {
  id: string;
  title: string;
  content: string;
  likeCount: number;
  isLikedByUser: boolean;
  author: {
    name: string;
  };
}

export interface FriendLike {
  postId: string;
  name: string;
}
