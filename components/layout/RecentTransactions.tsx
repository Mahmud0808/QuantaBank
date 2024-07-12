"use client";

import Link from "next/link";
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BankTabItem } from "../common/BankTabItem";
import BankInfo from "../common/BankInfo";
import TransactionTable from "./TransactionTable";

const RecentTransactions = ({
    accounts,
    transactions = [],
    appwriteItemId,
    page = 1,
}: RecentTransactionsProps) => {
    const [activeTab, setActiveTab] = useState(appwriteItemId);

    const onTabChange = (value: any) => {
        setActiveTab(value);
    };

    return (
        <section className="recent-transactions">
            <header className="flex items-center justify-between">
                <h2 className="recent-transactions-label">
                    Recent Transactions
                </h2>
                <Link
                    href={`/transaction-history?id=${appwriteItemId}`}
                    className="view-all-btn"
                >
                    View All
                </Link>
            </header>
            <Tabs
                defaultValue={activeTab}
                onValueChange={onTabChange}
                className="w-full"
            >
                <TabsList className="recent-transactions-tablist">
                    {accounts.map((account: Account) => (
                        <TabsTrigger
                            key={account.id}
                            value={account.appwriteItemId}
                        >
                            <BankTabItem
                                key={account.id}
                                account={account}
                                isActive={
                                    activeTab === account.appwriteItemId
                                }
                            />
                        </TabsTrigger>
                    ))}
                </TabsList>
                {accounts.map((account: Account) => (
                    <TabsContent
                        key={account.id}
                        value={account.appwriteItemId}
                        className="space-y-4"
                    >
                        <BankInfo
                            account={account}
                            isActive={activeTab === account.appwriteItemId}
                            type="full"
                        />
                        <TransactionTable transactions={transactions} />
                    </TabsContent>
                ))}
            </Tabs>
        </section>
    );
};

export default RecentTransactions;
