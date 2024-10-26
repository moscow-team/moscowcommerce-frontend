import Aside from "@/components/Aside";
import { Skeleton } from "@nextui-org/react";


export default function Loading() {
    return (
        <div className="w-full h-screen flex flex-row">
            <Aside>
                <div className="flex flex-col gap-5">
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                </div>
            </Aside>
            <div>
            <div className="w-full h-full flex flex-col justify-center gap-3">
                <Skeleton className="h-[125px] w-[250px] rounded-xl" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-1/2" />
            </div>
            </div>

        </div>
    );
}