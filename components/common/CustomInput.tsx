import React from "react";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Control, FieldPath } from "react-hook-form";
import { z } from "zod";
import { authFormSchema } from "@/lib/utils";

const formSchema = authFormSchema("sign-up");

interface CustomInputProps {
    control: Control<z.infer<typeof formSchema>>;
    name: FieldPath<z.infer<typeof formSchema>>;
    type: string;
    label: string;
    placeholder: string;
}

const CustomInput = ({
    control,
    name,
    type,
    label,
    placeholder,
}: CustomInputProps) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <div className="form-item">
                    <FormLabel className="form-label">{label}</FormLabel>
                    <div className="flex w-full flex-col">
                        <FormItem>
                            <FormControl>
                                <Input
                                    placeholder={placeholder}
                                    type={type}
                                    className="input-class"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage className="form-message mt-2" />
                        </FormItem>
                    </div>
                </div>
            )}
        />
    );
};

export default CustomInput;
