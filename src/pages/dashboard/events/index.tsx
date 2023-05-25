import { format } from "date-fns";
import Head from "next/head";
import Image from "next/image";
import {
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

const Events = () => {
  const { data: posts, isLoading } = api.post.getAllFromAuthor.useQuery();
  const { mutate } = api.post.changeStatus.useMutation({
    onSuccess: () => void ctx.post.getAllFromAuthor.invalidate(),
  });
  const ctx = api.useContext();

  const handleSwitchChange = (id: string, published: boolean) => {
    mutate({ id, published });
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
        <h1 className="text-4xl font-bold">Your Events</h1>

        <div className="mt-8 flex flex-col space-y-4">
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <Table>
              <TableCaption>A list of your recent event posts</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Image</TableHead>
                  <TableHead className="w-[100px]">Event Title</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-center">Price (€)</TableHead>
                  <TableHead className="text-center">Location</TableHead>
                  <TableHead className="text-center">Date</TableHead>
                  <TableHead className="text-center">Published</TableHead>
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
                    <TableCell className="font-medium">{post.title}</TableCell>
                    <TableCell>{post.description}</TableCell>
                    <TableCell className="text-center">{post.price}</TableCell>
                    <TableCell className="text-center">
                      {post.location}
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
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </main>
    </ProtectedPage>
  );
};

export default Events;
