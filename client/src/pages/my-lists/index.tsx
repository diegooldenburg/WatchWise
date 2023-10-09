import { useRouter } from "next/router";
import MyLists from "../../components/MyLists";
import Navbar from "../../components/Navbar";
import { useNavbarContext } from "@/contexts/NavbarContext";

export default function MyListsPage() {
  const router = useRouter();
  const { setShowList } = useNavbarContext();

  const setSelectedList = (listName: string) => {
    setShowList(true);
    router.push(`/my-lists/${listName}`);
  };

  return (
    <div className="bg-primary text-secondary h-screen flex flex-col items-center justify-center">
      <Navbar />
      <MyLists setSelectedList={setSelectedList} />
    </div>
  );
}
