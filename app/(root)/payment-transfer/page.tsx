import HeaderBox from "@/components/layout/HeaderBox";
import PaymentTransferForm from "@/components/layout/PaymentTransferForm";
import { getAccounts } from "@/lib/actions/bank.actions";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import React from "react";

const Transfer = async () => {
    const loggedIn = await getLoggedInUser();

    if (!loggedIn) {
        redirect("/sign-in");
    }

    const accounts = await getAccounts({ userId: loggedIn.$id });

    if (!accounts) return;

    return (
        <section className="payment-transfer">
            <HeaderBox
                title="Payment Transfer"
                subtext="Transfer funds from one account to another"
            />
            <section className="size-full pt-5">
                <PaymentTransferForm accounts={accounts?.data} />
            </section>
        </section>
    );
};

export default Transfer;
