import HeaderBox from "@/components/layout/HeaderBox";
import RightSideBar from "@/components/layout/RightSideBar";
import TotalBalanceBox from "@/components/layout/TotalBalanceBox";
import React from "react";

const Home = () => {
    const loggedIn = {
        firstName: "Mahmud",
        lastName: "Hasan",
        email: "contact@example.com",
    };

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
                        accounts={[]}
                        totalBanks={1}
                        totalCurrentBalance={1250.35}
                    />
                </header>

                RECENT TRANSACTIONS
            </div>
            <RightSideBar
                user={loggedIn}
                transactions={[]}
                banks={[{ currentBalance: 123.5 }, { currentBalance: 500.75 }]}
            />
        </section>
    );
};

export default Home;
