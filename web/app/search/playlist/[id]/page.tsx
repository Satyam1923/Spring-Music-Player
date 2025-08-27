import Playlist from "@/components/Playlist";

export default async function AlbumPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params; 
  return <Playlist id={id} />;
}
