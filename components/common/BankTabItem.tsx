"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { cn, formUrlQuery } from "@/lib/utils";

export const BankTabItem = ({ account, isActive }: BankTabItemProps) => {
    const searchParams = useSearchParams();

    return (
        <div
            className={cn(`banktab-item`, {
                " border-blue-600": isActive,
            })}
        >
            <p
                className={cn(
                    `text-16 line-clamp-1 flex-1 font-medium text-gray-500`,
                    {
                        " text-blue-600": isActive,
                    }
                )}
            >
                {account.name}
            </p>
        </div>
    );
};
