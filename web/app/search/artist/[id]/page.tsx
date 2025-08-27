import Artist from "@/components/Artist";

export default async function AlbumPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params; 
  return <Artist id={id} />;
}
