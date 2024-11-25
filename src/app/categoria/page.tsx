"use client"

import { useRouter } from "next/navigation";
import { useCategory } from "../context/useCategory";
import { Categoria } from "@/interfaces/Categoria";

export default function Page() {
    const router = useRouter();
    const { categories } = useCategory();
    return (
        <div>
            <section className="py-12" >
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-8">
                            Categorías
                        </h2>
                    <div className="flex flex-row flex-wrap gap-10 mt-28 justify-center items-center">
                        {categories.map((category:Categoria) => (
                            <div
                                key={category.id}
                                className="relative rounded-lg shadow-md h-60 w-60 cursor-pointer bg-[#424242]"
                                onClick={() => router.push(`/categoria/${category.id}`)}
                            >
                                <div className="flex justify-center">
                                    <img
                                        src={category.photo}
                                        className="h-52 w-52 mb-32 absolute -top-20 object-contain hover:scale-125 transition-transform duration-200 cursor-pointer"
                                        alt={category.name}
                                    ></img>
                                    <h3 className="absolute bottom-10 text-white text-xl font-semibold">
                                        {category.name}
                                    </h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}