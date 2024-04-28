"use client";

import { useOptimistic } from "react";
import { dislikePost, likePost } from "@/app/(auth)/tweets/[id]/action";  //../app/tweets/[id]/action
import { HeartIcon } from "@heroicons/react/24/outline";

interface LikeButtonProps {
  isLiked: boolean;
  likeCount: number;
  postId: number;
}

export default function HeartBtn ({
  isLiked,
  likeCount,
  postId,
}: LikeButtonProps) {
  const [state, reducerFn] = useOptimistic(
    { isLiked, likeCount },
    (previousState, payload) => ({
      isLiked: !previousState.isLiked,
      likeCount: previousState.isLiked
        ? previousState.likeCount - 1
        : previousState.likeCount + 1,
    })
  );
  const onClick = async () => {
    reducerFn(undefined);
    if (isLiked) {
      await dislikePost(postId);
    } else {
      await likePost(postId);
    }
  };
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-4 text-neutral-400 border-2 border-slate-300 rounded-full text-sm p-2 transition-colors ${
        state.isLiked
          ? "bg-orange-500 text-white border-orange-500"
          : "hover:bg-neutral-300"
      }`}
    >
      {state.isLiked ? (
        <HeartIcon className="size-7" />
      ) : (
        <HeartIcon className="size-7" />
      )}
    </button>
  );
}