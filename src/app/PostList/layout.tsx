import { PostListProvider } from "./context";

export function PostListLayout({ children }: { children: React.ReactNode }) {
  return <PostListProvider>{children}</PostListProvider>;
}
