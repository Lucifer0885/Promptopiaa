"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Form from "@components/Form";

const FetchPromptDetails = ({ promptId, setPost }) => {
  useEffect(() => {
    const getPromptDetails = async () => {
      const response = await fetch(`/api/prompt/${promptId}`);
      const data = await response.json();

      setPost({
        prompt: data.prompt,
        tag: data.tag,
      });
    };

    if (promptId) getPromptDetails();
  }, [promptId, setPost]);

  return null;
};

const UpdatePromptContent = ({ promptId }) => {
  const router = useRouter();
  const [post, setPost] = useState({ prompt: "", tag: "" });
  const [submitting, setIsSubmitting] = useState(false);

  const updatePrompt = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!promptId) return alert("Missing PromptId!");

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Suspense fallback={<div>Loading prompt details...</div>}>
        <FetchPromptDetails promptId={promptId} setPost={setPost} />
      </Suspense>
      <Form
        type="Edit"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={updatePrompt}
      />
    </>
  );
};

const UpdatePrompt = () => {
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UpdatePromptContent promptId={promptId} />
    </Suspense>
  );
};

export default UpdatePrompt;