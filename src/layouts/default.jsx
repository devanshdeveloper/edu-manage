import { Navbar } from "@/components/navbar";
import { Outlet } from "react-router-dom";

export default function DefaultLayout() {
  return (
    <div className="relative flex flex-col h-screen">
      <Navbar />
      <main className="container mx-auto">
        <Outlet />
      </main>
      <footer className="w-full flex items-center justify-center py-3"></footer>
    </div>
  );
}
