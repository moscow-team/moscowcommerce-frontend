import { Skeleton } from "@/components/ui/skeleton";



export default function Loading() {
    return (
        <section className="flex flex-row gap-5 py-32">
            <div className="w-full h-full flex flex-col justify-center items-center gap-5 ">
                <div className="aspect-square object-contain w-2/5 h-2/5 p-15 cursor-pointer space-y-3 flex flex-col">
                        <Skeleton className="h-full w-full rounded-xl" />
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-full" />
                        </div>
                </div>
                <div className="w-full flex flex-row justify-center flex-wrap h-full gap-4">
                    {Array.from({ length: 4 }).map((_, index) => (
                        <Skeleton key={index} className="h-32 w-32 rounded-xl" />
                    ))}
                </div>
            </div>
            <div className="w-full h-full flex flex-col justify-center gap-3">
                <Skeleton className="h-[125px] w-[250px] rounded-xl" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-1/2" />
            </div>
        </section>
    );
}