import { ReactNode } from "react";

interface AsideProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

export default function Aside({ children, isOpen, onClose }: AsideProps) {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={onClose}
        ></div>
      )}
      <aside
        className={`fixed top-[64px]   pt-10 px-10 left-0 h-[calc(100vh-64px)] bg-gray-100 overflow-y-auto transition-transform duration-300 ease-in-out z-40 w-64 lg:w-1/5 lg:static lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 lg:hidden"
        >
          ✕
        </button>
        {children}
      </aside>
    </>
  );
}

