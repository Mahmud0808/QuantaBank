"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next-nprogress-bar";

import { Button } from "@/components/ui/button";
import { formUrlQuery } from "@/lib/utils";

export const Pagination = ({ currentPage, totalPages }: PaginationProps) => {
    const router = useRouter();
    const searchParams = useSearchParams()!;

    const handleNavigation = (type: "prev" | "next") => {
        const pageNumber = type === "prev" ? currentPage - 1 : currentPage + 1;

        const newUrl = formUrlQuery({
            params: searchParams.toString(),
            key: "page",
            value: pageNumber.toString(),
        });

        router.push(newUrl, { scroll: false });
    };

    return (
        <div className="flex justify-between gap-3">
            <Button
                size="lg"
                variant="ghost"
                className="p-0 hover:bg-transparent"
                onClick={() => handleNavigation("prev")}
                disabled={Number(currentPage) <= 1}
            >
                <Image
                    src="/icons/arrow-left.svg"
                    alt="arrow"
                    width={20}
                    height={20}
                    className="mr-2"
                />
                Prev
            </Button>
            <p className="text-14 flex items-center px-2">
                {currentPage} / {totalPages}
            </p>
            <Button
                size="lg"
                variant="ghost"
                className="p-0 hover:bg-transparent"
                onClick={() => handleNavigation("next")}
                disabled={Number(currentPage) >= totalPages}
            >
                Next
                <Image
                    src="/icons/arrow-left.svg"
                    alt="arrow"
                    width={20}
                    height={20}
                    className="ml-2 -scale-x-100"
                />
            </Button>
        </div>
    );
};
