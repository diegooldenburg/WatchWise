import { useRouter } from "next/router";
import ListComponent from "@/components/ListComponent";
import Navbar from "@/components/Navbar";

export default function ListPage() {
  const router = useRouter();
  const { listName } = router.query;

  return (
    <div className="bg-primary text-secondary h-screen flex flex-col items-center justify-center">
      <Navbar />
      <ListComponent listName={listName as string} />
    </div>
  );
}
