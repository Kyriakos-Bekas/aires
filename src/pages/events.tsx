import { useEffect, useState } from "react";
import { type PublicPost } from "~/components/Post/Post";
import { Checkbox, OpenPage, Post, PostSkeleton } from "~/components";
import Head from "next/head";
import { sportCategories as categories } from "~/data/sportCategories";
import { api } from "~/utils/api";

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
    <>
      <Head>
        <title>Upcoming Events | AirES</title>
        <meta
          name="description"
          content="Search for upcoming events based on sport and location"
        />
      </Head>
      <OpenPage>
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
                    filteredPosts.map((post) => (
                      <Post key={post.id} {...post} />
                    ))
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
      </OpenPage>
    </>
  );
};

export default Events;
