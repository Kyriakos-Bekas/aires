import Image from "next/image";
import React from "react";
import Button from "../Button/Button";
import { type Post as PostType } from "@prisma/client";
import { share } from "~/utils/share";
import { useRouter } from "next/router";

export type PublicPost = Omit<PostType, "published">;

type PostProps = PublicPost;

const Post = ({
  id,
  title,
  description,
  date,
  category,
  location,
  imageUrl,
  partnerId,
}: PostProps) => {
  const router = useRouter();

  const handleCreatePlan = () => {
    void router.push(`/create-plan?eventId=${id}`);
  };

  return (
    <div className="mb-4 flex flex-col overflow-hidden rounded bg-white text-slate-500 shadow-md shadow-slate-200 last:mb-0 sm:flex-row lg:mb-6 last:lg:mb-0">
      <figure className="flex-1">
        <img
          src={imageUrl}
          alt={`Event ${title}`}
          className="aspect-auto min-h-full object-cover"
        />
      </figure>

      <div className="flex-1 p-4 sm:px-0 lg:p-6">
        <header className="mb-4 flex gap-4">
          <a
            href={"#"}
            className="relative inline-flex h-12 w-12 items-center justify-center rounded-full"
          >
            <Image
              src={"https://i.pravatar.cc/48?img=24"}
              alt={`${title} Author Profile Image`}
              title={`${title} Author Profile Image`}
              width={48}
              height={48}
              className="block max-w-full rounded-full"
            />
          </a>
          <div>
            <h2 className="text-xl font-medium text-slate-700">{title}</h2>
            <p className="text-sm text-slate-400">
              <span className="inline-flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-4 w-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20.893 13.393l-1.135-1.135a2.252 2.252 0 01-.421-.585l-1.08-2.16a.414.414 0 00-.663-.107.827.827 0 01-.812.21l-1.273-.363a.89.89 0 00-.738 1.595l.587.39c.59.395.674 1.23.172 1.732l-.2.2c-.212.212-.33.498-.33.796v.41c0 .409-.11.809-.32 1.158l-1.315 2.191a2.11 2.11 0 01-1.81 1.025 1.055 1.055 0 01-1.055-1.055v-1.172c0-.92-.56-1.747-1.414-2.089l-.655-.261a2.25 2.25 0 01-1.383-2.46l.007-.042a2.25 2.25 0 01.29-.787l.09-.15a2.25 2.25 0 012.37-1.048l1.178.236a1.125 1.125 0 001.302-.795l.208-.73a1.125 1.125 0 00-.578-1.315l-.665-.332-.091.091a2.25 2.25 0 01-1.591.659h-.18c-.249 0-.487.1-.662.274a.931.931 0 01-1.458-1.137l1.411-2.353a2.25 2.25 0 00.286-.76m11.928 9.869A9 9 0 008.965 3.525m11.928 9.868A9 9 0 118.965 3.525"
                  />
                </svg>
                <span>{location}</span>
                <span className="mx-1 h-1 w-1 rounded-full bg-slate-400"></span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-4 w-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                  />
                </svg>

                <span>{date.toDateString()}</span>
              </span>
            </p>
          </div>
        </header>
        <p>{description}</p>
        <div className="my-4 inline-flex items-center justify-start gap-2 whitespace-nowrap rounded text-xs font-semibold uppercase tracking-wide">
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
              role="graphics-symbol"
              aria-labelledby={category}
            >
              <title id={category}>{category}</title>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
              />
            </svg>
          </span>
          <span>{category}</span>
        </div>
        <div className="mt-4 flex justify-end gap-2 p-2 pt-0">
          <button onClick={handleCreatePlan}>
            <Button
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              }
              label="Create Plan"
              variant="primary"
            />
          </button>
          <button
            onClick={() =>
              void share({
                title,
                text: description,
                url: imageUrl,
              })
            }
          >
            <Button
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  role="graphics-symbol"
                  aria-labelledby="share-icon-title share-icon-desc"
                >
                  <title id="share-icon-title">Share icon</title>
                  <desc id="share-icon-desc">
                    Press this icon to share this event
                  </desc>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                  />
                </svg>
              }
              variant="secondary"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Post);
export { Post as PostNotMemoized };
