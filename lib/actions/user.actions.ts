"use server";

import { ID } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../server/appwrite";
import { cookies } from "next/headers";
import { encryptId, extractCustomerIdFromUrl, parseStringify } from "../utils";
import {
    CountryCode,
    ProcessorTokenCreateRequest,
    ProcessorTokenCreateRequestProcessorEnum,
    Products,
} from "plaid";
import { plaidClient } from "../server/plaid";
import { revalidatePath } from "next/cache";
import { addFundingSource, createDwollaCustomer } from "./dwolla.actions";

const {
    APPWRITE_DATABASE_ID: DATABASE_ID,
    APPWRITE_USER_COLLECTION_ID: USER_COLLECTION_ID,
    APPWRITE_BANK_COLLECTION_ID: BANK_COLLECTION_ID,
    APPWRITE_TRANSACTION_COLLECTION_ID: TRANSACTION_COLLECTION_ID,
} = process.env;

export const signIn = async ({ email, password }: signInProps) => {
    try {
        const { account } = await createAdminClient();

        const session = await account.createEmailPasswordSession(
            email,
            password
        );

        cookies().set("quanta-appwrite-session", session.secret, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: true,
        });

        return { success: true, data: parseStringify(session) };
    } catch (error: any) {
        console.error("Sign in error: ", error);
        return { success: false, error: error.message };
    }
};

export const signUp = async ({ password, ...userData }: SignUpParams) => {
    const { email, firstName, lastName } = userData;

    let newUserAccount;

    try {
        const { account, database } = await createAdminClient();

        newUserAccount = await account.create(
            ID.unique(),
            email,
            password,
            `${firstName} ${lastName}`
        );

        if (!newUserAccount) {
            return { success: false, error: "Failed to create user account" };
        }

        const dwollaCustomerObject = await createDwollaCustomer({
            ...userData,
            type: "personal",
        });

        let dwollaCustomerId;
        let dwollaCustomerUrl;

        if (dwollaCustomerObject.success) {
            dwollaCustomerUrl = dwollaCustomerObject.data!;
            dwollaCustomerId = extractCustomerIdFromUrl(dwollaCustomerUrl);
        } else {
            return { success: false, error: dwollaCustomerObject.error };
        }

        if (!dwollaCustomerUrl) {
            return {
                success: false,
                error: "Failed to create Dwolla customer URL",
            };
        }

        if (!dwollaCustomerId) {
            return {
                success: false,
                error: "Failed to extract Dwolla customer ID",
            };
        }

        const newUser = await database.createDocument(
            DATABASE_ID!,
            USER_COLLECTION_ID!,
            ID.unique(),
            {
                ...userData,
                userId: newUserAccount.$id,
                dwollaCustomerId,
                dwollaCustomerUrl,
            }
        );

        const session = await account.createEmailPasswordSession(
            email,
            password
        );

        cookies().set("quanta-appwrite-session", session.secret, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: true,
        });

        return { success: true, data: parseStringify(newUser) };
    } catch (error: any) {
        console.error("Sign up error: ", error.message);
        return { success: false, error: error.message };
    }
};

export async function getLoggedInUser() {
    try {
        const { account } = await createSessionClient();
        const user = await account.get();
        return parseStringify(user);
    } catch (error) {
        return null;
    }
}

export async function logOutAccount() {
    try {
        const { account } = await createSessionClient();
        cookies().delete("quanta-appwrite-session");
        await account.deleteSession("current");
    } catch (error) {
        return null;
    }
}

export const createLinkToken = async (user: User) => {
    try {
        const tokenParams = {
            user: {
                client_user_id: user.$id,
            },
            client_name: `${user.firstName} ${user.lastName}`,
            products: ["auth"] as Products[],
            language: "en",
            country_codes: ["US"] as CountryCode[],
        };

        const response = await plaidClient.linkTokenCreate(tokenParams);

        return parseStringify({ linkToken: response.data.link_token });
    } catch (error) {
        console.error("Sign in error: ", error);
    }
};

export const createBankAccount = async ({
    userId,
    bankId,
    accountId,
    accessToken,
    fundingSourceUrl,
    shareableId,
}: createBankAccountProps) => {
    try {
        const { database } = await createAdminClient();

        const bankAccount = await database.createDocument(
            DATABASE_ID!,
            BANK_COLLECTION_ID!,
            ID.unique(),
            {
                userId,
                bankId,
                accountId,
                accessToken,
                fundingSourceUrl,
                shareableId,
            }
        );

        return parseStringify(bankAccount);
    } catch (error) {
        console.error("Error creating bank account: ", error);
    }
};

// This function exchanges a public token for an access token and item ID
export const exchangePublicToken = async ({
    publicToken,
    user,
}: exchangePublicTokenProps) => {
    try {
        // Exchange public token for access token and item ID
        const response = await plaidClient.itemPublicTokenExchange({
            public_token: publicToken,
        });

        const accessToken = response.data.access_token;
        const itemId = response.data.item_id;

        // Get account information from Plaid using the access token
        const accountsResponse = await plaidClient.accountsGet({
            access_token: accessToken,
        });

        const accountData = accountsResponse.data.accounts[0];

        // Create a processor token for Dwolla using the access token and account ID
        const request: ProcessorTokenCreateRequest = {
            access_token: accessToken,
            account_id: accountData.account_id,
            processor: "dwolla" as ProcessorTokenCreateRequestProcessorEnum,
        };

        const processorTokenResponse = await plaidClient.processorTokenCreate(
            request
        );
        const processorToken = processorTokenResponse.data.processor_token;

        // Create a funding source URL for the account using the Dwolla customer ID, processor token, and bank name
        const fundingSourceUrl = await addFundingSource({
            dwollaCustomerId: user.dwollaCustomerId,
            processorToken,
            bankName: accountData.name,
        });

        if (!fundingSourceUrl) {
            throw Error("Failed to create funding source URL");
        }

        // Create a bank account using the user ID, item ID, account ID, access token, funding source URL, and shareable ID
        await createBankAccount({
            userId: user.$id,
            bankId: itemId,
            accountId: accountData.account_id,
            accessToken,
            fundingSourceUrl,
            shareableId: encryptId(accountData.account_id),
        });

        revalidatePath("/");

        return parseStringify({
            publicTokenExchange: "complete",
        });
    } catch (error) {
        console.error(
            "An error occurred while creating exchange token:",
            error
        );
    }
};
