import MyLists from "../../components/MyLists";
import Navbar from "../../components/Navbar";
import { useNavbarContext } from "@/contexts/NavbarContext";

export default function MyListsPage() {
  const { setShowList } = useNavbarContext();

  return (
    <div className="bg-primary text-secondary h-screen flex flex-col items-center justify-center">
      <Navbar />
      <MyLists
        setSelectedList={(listName: string) => {
          setShowList(true);
          // Additional logic for setting the selected list
        }}
      />
    </div>
  );
}
