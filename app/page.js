import Footer from "@/components/Footer";
import Header from "@/components/Header";
import NoteCards from "@/components/NoteCards";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <div className="border-b">
      <Header />
      </div>
      <NoteCards />
      <Footer />
    </div>
  );
}
