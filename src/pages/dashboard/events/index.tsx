import { format } from "date-fns";
import { Trash2 } from "lucide-react";
import Head from "next/head";
import Image from "next/image";
import {
  Button,
  ProtectedPage,
  Switch,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components";
import { api } from "~/utils/api";
import mapCodeToLocation from "~/utils/mapCodeToLocation";

const Events = () => {
  const { data: posts, isLoading } = api.post.getAllFromAuthor.useQuery();
  const { mutate: changeEventPostStatusMutate } =
    api.post.changeStatus.useMutation({
      onSuccess: () => void ctx.post.getAllFromAuthor.invalidate(),
    });
  const { mutate: deleteEventPostMutate } = api.post.delete.useMutation({
    onSuccess: (post) => {
      void ctx.post.getAllFromAuthor.invalidate();
      console.log(`post ${post.title} deleted`);
    },
  });
  const ctx = api.useContext();

  const handleSwitchChange = (id: string, published: boolean) => {
    changeEventPostStatusMutate({ id, published });
  };

  const handleEventPostDetete = (id: string) => {
    deleteEventPostMutate({ id });
  };

  return (
    <ProtectedPage>
      <Head>
        <title>Partner Events | AirES</title>
        <meta
          name="description"
          content="A list of all the events that you have created"
        />
      </Head>

      <main className="container py-8">
        <h1 className="text-3xl font-semibold">Your Events</h1>

        <div className="mt-8 flex flex-col space-y-4">
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <div className="max-w-sm overflow-x-scroll md:max-w-full md:overflow-x-hidden">
              <Table>
                <TableCaption>
                  <p className="text-left md:text-center">
                    A list of all your event posts
                  </p>
                </TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Image</TableHead>
                    <TableHead className="w-[100px]">Event Title</TableHead>
                    <TableHead className="hidden lg:table-cell">
                      Description
                    </TableHead>
                    <TableHead className="hidden text-center lg:table-cell">
                      Price (€)
                    </TableHead>
                    <TableHead className="hidden text-center lg:table-cell">
                      Location
                    </TableHead>
                    <TableHead className="text-center">Date</TableHead>
                    <TableHead className="text-center">Published</TableHead>
                    <TableHead className="text-center">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {posts?.map((post) => (
                    <TableRow key={post.id}>
                      <TableCell>
                        <Image
                          src={post.imageUrl}
                          alt={post.title}
                          width={100}
                          height={100}
                          style={{ objectFit: "cover" }}
                        />
                      </TableCell>
                      <TableCell className="font-medium">
                        {post.title}
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <p
                          className="line-clamp-2 max-w-[30ch] text-ellipsis"
                          title={post.description}
                        >
                          {post.description}
                        </p>
                      </TableCell>
                      <TableCell className="hidden text-center lg:table-cell">
                        {post.price}
                      </TableCell>
                      <TableCell className="hidden text-center lg:table-cell">
                        {mapCodeToLocation(post.location)}
                      </TableCell>
                      <TableCell className="text-center">
                        {format(post.date, "dd MMM yyyy")}
                      </TableCell>
                      <TableCell className="text-center">
                        <Switch
                          id={post.id}
                          checked={post.published}
                          onCheckedChange={(checked) =>
                            handleSwitchChange(post.id, checked)
                          }
                        />
                      </TableCell>
                      <TableCell className="text-center">
                        <Button
                          variant="ghost"
                          onClick={() => handleEventPostDetete(post.id)}
                        >
                          <Trash2 className="h-5 w-5" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </main>
    </ProtectedPage>
  );
};

export default Events;
