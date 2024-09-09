import Image from "next/image";
export default function Home() {
  return (
    <main className="w-full min-h-screen bg-orange-200">
      <Image src={"/moscow-banner.jpg"} alt={""} width={1920} height={40} className="bor border-8 border-x-primary border-y-primary"></Image> 

    </main>
  );
}
