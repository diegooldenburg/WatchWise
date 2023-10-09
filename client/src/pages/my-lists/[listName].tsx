import { useRouter } from "next/router";
import ListComponent from "@/components/ListComponent";
import Navbar from "@/components/Navbar";
import { GetServerSideProps } from "next";
import { Media } from "@/components/ListComponent";

interface ListProps {
  listName: string;
  list: any;
}

export default function ListPage({ list }: ListProps) {
  const router = useRouter();
  const { listName } = router.query;
  const addItemToList = (item: Media) => {
    undefined;
  };

  return (
    <div className="bg-primary text-secondary h-screen flex flex-col items-center justify-center">
      <Navbar />
      <ListComponent
        listName={listName as string}
        list={list}
        addItemToList={addItemToList}
      />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const listName = context.params!.listName as string;

  const res = await fetch(`http://localhost:5249/list/${listName}`);
  const data = await res.json();

  return { props: { list: data } };
};
