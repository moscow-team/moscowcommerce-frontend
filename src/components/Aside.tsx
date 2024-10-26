import { ReactNode } from "react";

export default function Aside({ children }: { children: ReactNode }) {
    return (
        <aside className="w-1/6 h-full bg-gray-100 p-4">
            {children}
        </aside>
    );

}