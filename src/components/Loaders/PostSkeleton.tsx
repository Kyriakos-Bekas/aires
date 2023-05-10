const PostSkeleton = () => {
  return (
    <div className="mb-4 flex flex-col overflow-hidden rounded bg-white text-slate-500 shadow-md shadow-slate-200 last:mb-0 sm:flex-row lg:mb-6 last:lg:mb-0">
      <div className="min-h-full flex-1 bg-slate-300"></div>
      <div className="flex-1 p-4 sm:px-0 lg:p-6">
        <div className="mb-4 flex gap-4">
          <div className="relative h-12 w-12 rounded-full bg-slate-300"></div>
          <div className="flex grow flex-col justify-center">
            <div className="mb-2 h-6 w-[65%] rounded-md bg-slate-300"></div>
            <div className="h-2 w-[80%] rounded-md bg-slate-300"></div>
          </div>
        </div>
        <div className="my-2 mt-8 h-2 w-[90%] rounded-md bg-slate-300"></div>
        <div className="my-2 h-2 rounded-md bg-slate-300"></div>
        <div className="my-2 h-2 w-[40%] rounded-md bg-slate-300"></div>
        <div className="mt-6 h-5 w-[20%] rounded-md bg-slate-300"></div>
        <div className="mt-8 flex justify-end gap-2 p-2 pt-0">
          <div className="h-10 w-40 rounded-md bg-slate-300"></div>
          <div className="h-10 w-10 rounded-md bg-slate-300"></div>
        </div>
      </div>
    </div>
  );
};

export default PostSkeleton;
