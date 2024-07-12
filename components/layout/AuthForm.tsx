"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import CustomInput from "../common/CustomInput";
import { authFormSchema } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useRouter } from "next-nprogress-bar";
import { signIn, signUp } from "@/lib/actions/user.actions";
import PlaidLink from "../common/PlaidLink";
import { toast } from "@/components/ui/use-toast";

const AuthForm = ({ type }: { type: string }) => {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const formSchema = authFormSchema(type);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setIsLoading(true);

        const userData = {
            firstName: values.firstName!,
            lastName: values.lastName!,
            address1: values.address1!,
            city: values.city!,
            state: values.state!,
            postalCode: values.postalCode!,
            dateOfBirth: values.dob!,
            ssn: values.ssn!,
            email: values.email,
            password: values.password,
        };

        try {
            // Sign up with Appwrite & create plaid token

            let result;

            if (type === "sign-up") {
                result = await signUp(userData);
            }

            if (type === "sign-in") {
                result = await signIn({
                    email: values.email,
                    password: values.password,
                });
            }

            if (result?.success) {
                setUser(result?.data);

                if (type === "sign-in") {
                    router.push("/");
                }
            } else {
                toast({
                    title: "Uh Oh! Something went wrong.",
                    description: result?.error,
                    variant: "destructive",
                    className: "bg-white",
                });
            }

            if (type === "sign-up") {
                setIsLoading(false);
            }
        } catch (err: any) {
            console.log(err);
            toast({
                title: "Uh Oh! Something went wrong.",
                description: err.message,
                variant: "destructive",
                className: "bg-white",
            });

            setIsLoading(false);
        }
    };

    return (
        <section className="auth-form">
            <header className="flex flex-col gap-5 md:gap-8">
                <Link
                    href="/"
                    className="cursor-pointer flex items-center gap-1"
                >
                    <Image
                        src="/icons/logo.svg"
                        width={34}
                        height={34}
                        alt="logo"
                    />
                    <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">
                        Quanta
                    </h1>
                </Link>
                <div className="flex flex-col gap-1 md:gap-3">
                    <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
                        {user
                            ? "Link Account"
                            : type === "sign-in"
                            ? "Sign In"
                            : "Sign Up"}
                        <p className="text-16 font-normal text-gray-600">
                            {user
                                ? "Link your account to get started"
                                : "Please enter your details"}
                        </p>
                    </h1>
                </div>
            </header>
            {user && type === "sign-up" ? (
                <div className="flex flex-col gap-4">
                    <PlaidLink user={user} variant="primary" />
                </div>
            ) : (
                <>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-8"
                        >
                            {type === "sign-up" && (
                                <>
                                    <div className="flex gap-4">
                                        <CustomInput
                                            control={form.control}
                                            name="firstName"
                                            type="text"
                                            label="First Name"
                                            placeholder="Enter your first name"
                                        />
                                        <CustomInput
                                            control={form.control}
                                            name="lastName"
                                            type="text"
                                            label="Last Name"
                                            placeholder="Enter your last name"
                                        />
                                    </div>
                                    <CustomInput
                                        control={form.control}
                                        name="address1"
                                        type="text"
                                        label="Address"
                                        placeholder="Enter your address"
                                    />
                                    <CustomInput
                                        control={form.control}
                                        name="city"
                                        type="text"
                                        label="City"
                                        placeholder="Enter your city"
                                    />
                                    <div className="flex gap-4">
                                        <CustomInput
                                            control={form.control}
                                            name="state"
                                            type="text"
                                            label="State"
                                            placeholder="Enter your state"
                                        />
                                        <CustomInput
                                            control={form.control}
                                            name="postalCode"
                                            type="text"
                                            label="Postal Code"
                                            placeholder="Example: 11101"
                                        />
                                    </div>
                                    <div className="flex gap-4">
                                        <CustomInput
                                            control={form.control}
                                            name="dob"
                                            type="text"
                                            label="Date of Birth"
                                            placeholder="YYYY-MM-DD"
                                        />
                                        <CustomInput
                                            control={form.control}
                                            name="ssn"
                                            type="text"
                                            label="SSN"
                                            placeholder="Example: 1234"
                                        />
                                    </div>
                                </>
                            )}
                            <CustomInput
                                control={form.control}
                                name="email"
                                type="email"
                                label="Email"
                                placeholder="Enter your email"
                            />
                            <CustomInput
                                control={form.control}
                                name="password"
                                type="password"
                                label="Password"
                                placeholder="Enter your password"
                            />
                            <div className="flex flex-col gap-4">
                                <Button
                                    type="submit"
                                    className="form-btn"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2
                                                size={20}
                                                className="animate-spin"
                                            />{" "}
                                            &nbsp; Loading...
                                        </>
                                    ) : type === "sign-in" ? (
                                        "Sign In"
                                    ) : (
                                        "Sign Up"
                                    )}
                                </Button>
                            </div>
                        </form>
                    </Form>
                    <footer className="flex justify-center gap-1">
                        <p className="text-14 font-normal text-gray-600">
                            {type === "sign-in"
                                ? "Don't have an account?"
                                : "Already have an account?"}
                        </p>
                        <Link
                            href={type === "sign-in" ? "/sign-up" : "/sign-in"}
                            className="form-link"
                        >
                            {type === "sign-in" ? "Sign Up" : "Sign In"}
                        </Link>
                    </footer>
                </>
            )}
        </section>
    );
};

export default AuthForm;
