import { useEffect, useState } from "react";
import { SliceZone } from "@prismicio/react";
import { createClient } from "@/prismicio";
import { components } from "@/slices";
import Header from "@/components/Header";
import ViewCanvas from "@/components/ViewCanvas";
import Footer from "@/components/Footer";
import AmbientOrbs from "@/components/AmbientOrbs";
import IngredientCard from "@/components/IngredientCard";
import "@/app/app.css";

export default function App() {
  const [page, setPage] = useState<any>(null);

  useEffect(() => {
    const client = createClient();
    client.getByUID("page", "home").then((data) => {
      setPage(data);
    });
  }, []);

  if (!page) return null;

  return (
    <div className="relative overflow-x-hidden bg-yellow-300">
      <AmbientOrbs />
      <Header />
      <main className="relative z-10">
        <SliceZone slices={page.data.slices} components={components} />
        <IngredientCard />
        <ViewCanvas />
      </main>
      <Footer />
    </div>
  );
}
