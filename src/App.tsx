import { useEffect, useState } from "react";
import { SliceZone } from "@prismicio/react";
import { createClient } from "@/prismicio";
import { components } from "@/slices";
import Header from "@/components/Header";
import ViewCanvas from "@/components/ViewCanvas";
import Footer from "@/components/Footer";
import AmbientOrbs from "@/components/AmbientOrbs";
import IngredientCard from "@/components/IngredientCard";
import FizziLogo from "@/components/FizziLogo";
import "@/app/app.css";

export default function App() {
  const [page, setPage] = useState<any>(null);

  useEffect(() => {
    const client = createClient();
    client.getByUID("page", "home").then((data) => {
      setPage(data);
    });
  }, []);

  if (!page) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-yellow-300 z-50">
        <div className="flex flex-col items-center space-y-4 animate-pulse">
          <FizziLogo className="h-16 w-auto text-sky-800" />
          <div className="h-2 w-32 bg-sky-900/20 rounded-full overflow-hidden">
            <div className="h-full bg-sky-900 animate-pulse rounded-full w-2/3" />
          </div>
          <p className="text-sky-950 font-bold text-sm tracking-wider uppercase">Loading 3D Experience...</p>
        </div>
      </div>
    );
  }

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
