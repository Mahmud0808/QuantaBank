import HeaderBox from "@/components/layout/HeaderBox";
import RecentTransactions from "@/components/layout/RecentTransactions";
import RightSideBar from "@/components/layout/RightSideBar";
import TotalBalanceBox from "@/components/layout/TotalBalanceBox";
import { getAccount, getAccounts } from "@/lib/actions/bank.actions";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import React from "react";

const Home = async ({ searchParams: { id, page } }: SearchParamProps) => {
    const currentPage = Number(page as string) || 1;
    const loggedIn = await getLoggedInUser();

    if (!loggedIn) {
        redirect("/sign-in");
    }

    const accounts = await getAccounts({ userId: loggedIn.$id });

    if (!accounts) return;

    const appwriteItemId = (id as string) || accounts?.data[0]?.appwriteItemId;
    const account = await getAccount({ appwriteItemId });
    
    return (
        <section className="home">
            <div className="home-content">
                <header className="home-header">
                    <HeaderBox
                        type="greeting"
                        title="Welcome"
                        user={loggedIn?.firstName || "Guest"}
                        subtext="Access and manage your account and transactions efficiently."
                    />
                    <TotalBalanceBox
                        accounts={accounts?.data}
                        totalBanks={accounts?.totalBanks}
                        totalCurrentBalance={accounts?.totalCurrentBalance}
                    />
                </header>
                <RecentTransactions
                    accounts={accounts?.data}
                    transactions={account?.transactions}
                    appwriteItemId={appwriteItemId}
                    page={currentPage}
                />
            </div>
            <RightSideBar
                user={loggedIn}
                transactions={accounts?.transactions}
                banks={accounts?.data?.slice(0, 2)}
            />
        </section>
    );
};

export default Home;
