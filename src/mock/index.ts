import { Post, FriendLike } from "./types";

let posts: Post[] = [
  {
    id: "1",
    title: "Post 1",
    content:
      "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
    likeCount: 10,
    isLikedByUser: false,
    author: {
      name: "Asher",
    },
  },
  {
    id: "2",
    title: "Post 2",
    content: "Content 2",
    likeCount: 20,
    isLikedByUser: true,
    author: {
      name: "Usher",
    },
  },
];

const friendLikes: FriendLike[] = [
  {
    postId: "1",
    name: "Asher",
  },
  {
    postId: "1",
    name: "Usher",
  },
  {
    postId: "2",
    name: "Fish",
  },
];

export async function getPost(id: string) {
  const post = posts.find((post) => post.id === id);
  if (!post) {
    throw new Error("Post not found");
  }
  return post;
}

export async function getRecentPostIds() {
  return ["1", "2"];
}

export async function getFriendLikes(postId: string) {
  return friendLikes.filter((like) => like.postId === postId);
}

export async function likePost(postId: string) {
  posts = structuredClone(posts);
  const post = posts.find((post) => post.id === postId);
  if (!post) {
    throw new Error("Post not found");
  }
  post.likeCount++;
  post.isLikedByUser = true;
}

export async function unlikePost(postId: string) {
  posts = structuredClone(posts);
  const post = posts.find((post) => post.id === postId);
  if (!post) {
    throw new Error("Post not found");
  }

  post.likeCount--;
  post.isLikedByUser = false;
}
