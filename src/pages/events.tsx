import { useEffect, useState } from "react";
import { type PublicPost } from "~/components/Post/Post";
import { Post, PostSkeleton } from "~/components";
import { BasicLayout } from "~/layouts";
import { api } from "~/utils/api";
import { type ExtremeSportCategory } from "@prisma/client";

type Filter = {
  label: ExtremeSportCategory;
  value: string;
};

const categories: Filter[] = [
  {
    label: "BMX",
    value: "BMX",
  },
  {
    label: "CANYONING",
    value: "Canoying",
  },
  {
    label: "SKYDIVING",
    value: "Skydiving",
  },
];

type CheckboxProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
};

const Checkbox = ({ label, value, onChange }: CheckboxProps) => {
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    onChange(value);
    setChecked((prev) => !prev);
  };

  return (
    <div className="relative mt-1 flex flex-wrap items-center">
      <input
        className="peer h-4 w-4 cursor-pointer appearance-none rounded border-2 border-slate-500 bg-white transition-colors checked:border-rose-500 checked:bg-rose-500 checked:hover:border-rose-600 checked:hover:bg-rose-600 focus:outline-none checked:focus:border-rose-700 checked:focus:bg-rose-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-slate-100 disabled:bg-slate-50"
        type="checkbox"
        value={value}
        checked={checked}
        onChange={handleChange}
        id="id-c01"
      />
      <label
        className="cursor-pointer pl-2 text-slate-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400"
        htmlFor="id-c01"
      >
        {label}
      </label>
      <svg
        className="pointer-events-none absolute left-0 top-1 h-4 w-4 -rotate-90 fill-white stroke-white opacity-0 transition-all duration-300 peer-checked:rotate-0 peer-checked:opacity-100 peer-disabled:cursor-not-allowed"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        aria-labelledby="title-1 description-1"
        role="graphics-symbol"
      >
        <title id="title-1">Check mark icon</title>
        <desc id="description-1">
          Check mark icon to indicate whether the checkbox is checked or not.
        </desc>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12.8116 5.17568C12.9322 5.2882 13 5.44079 13 5.5999C13 5.759 12.9322 5.91159 12.8116 6.02412L7.66416 10.8243C7.5435 10.9368 7.37987 11 7.20925 11C7.03864 11 6.87501 10.9368 6.75435 10.8243L4.18062 8.42422C4.06341 8.31105 3.99856 8.15948 4.00002 8.00216C4.00149 7.84483 4.06916 7.69434 4.18846 7.58309C4.30775 7.47184 4.46913 7.40874 4.63784 7.40737C4.80655 7.406 4.96908 7.46648 5.09043 7.57578L7.20925 9.55167L11.9018 5.17568C12.0225 5.06319 12.1861 5 12.3567 5C12.5273 5 12.691 5.06319 12.8116 5.17568Z"
        />
      </svg>
    </div>
  );
};

const Events = () => {
  const { data: posts, isLoading } = api.post.getAll.useQuery();
  const [appliedFilters, setAppliedFilters] = useState<string[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<PublicPost[]>(posts ?? []);

  useEffect(() => {
    if (!posts) return;
    if (appliedFilters.length === 0) {
      setFilteredPosts(posts);
    } else {
      setFilteredPosts(
        posts.filter((post) => appliedFilters.includes(post.category))
      );
    }
  }, [appliedFilters, posts]);

  const checkboxChangeHandler = (value: string) => {
    setAppliedFilters(
      // Check if already in array
      !appliedFilters.find((filter) => filter === value)
        ? // if not in array, add it
          [...appliedFilters, value]
        : // if already in array, remove it
          appliedFilters.filter((filter) => filter !== value)
    );
  };

  return (
    <BasicLayout>
      <div className="container py-8">
        <div className="grid grid-cols-4 gap-6 md:grid-cols-8 lg:grid-cols-12">
          <aside className="col-span-4 border-r border-slate-200 lg:col-span-4">
            <div className="">
              <h3 className="mb-4 text-lg font-medium">Filters</h3>

              <div>
                {categories.map((category) => (
                  <Checkbox
                    key={category.value}
                    label={category.label}
                    value={category.value}
                    onChange={checkboxChangeHandler}
                  />
                ))}
              </div>
            </div>
          </aside>
          <main className="col-span-4 lg:col-span-8">
            <h1 className="mb-6 text-2xl font-semibold">Events</h1>
            {isLoading ? (
              <PostSkeleton />
            ) : (
              <div>
                {!(filteredPosts.length === 0) ? (
                  filteredPosts.map((post) => <Post key={post.id} {...post} />)
                ) : (
                  <p className="mt-6 text-lg text-slate-600">
                    Nothing to see here...
                  </p>
                )}
              </div>
            )}
          </main>
        </div>
      </div>
    </BasicLayout>
  );
};

export default Events;
