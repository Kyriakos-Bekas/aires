import Image from "next/image";
import React from "react";
import Button from "../Button";
import { type Post as PostType } from "@prisma/client";
import { share } from "~/utils/share";
import { useRouter } from "next/router";
import {
  ArrowRightCircle,
  Calendar,
  Globe2,
  Share2,
  TagIcon,
} from "lucide-react";
import mapCodeToLocation from "~/utils/mapCodeToLocation";

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

  const handleShare = () =>
    void share({
      title,
      text: description,
      url: imageUrl,
    });

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
                <Globe2 className="h-4 w-4" />
                <span>{mapCodeToLocation(location)}</span>
                <span className="mx-1 h-1 w-1 rounded-full bg-slate-400"></span>
                <Calendar className="h-4 w-4" />
                <span>{date.toDateString()}</span>
              </span>
            </p>
          </div>
        </header>
        <p>{description}</p>
        <div className="my-4 inline-flex items-center justify-start gap-2 whitespace-nowrap rounded text-xs font-semibold uppercase tracking-wide">
          <span>
            <TagIcon className="h-5 w-5" />
          </span>
          <span>{category}</span>
        </div>
        <div className="mt-4 flex justify-end gap-2 p-2 pt-0">
          <Button onClick={handleCreatePlan}>
            Create Plan
            <ArrowRightCircle className="ml-2 h-4 w-4" />
          </Button>
          <Button onClick={handleShare} variant="secondary">
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Post);
export { Post as PostNotMemoized };
