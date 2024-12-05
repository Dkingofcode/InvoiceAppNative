import { View, Text, TextInput, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "~/components/Button";
import KeyboardAwareScrollView from  '~/components/KeyboardAwareScrollView';
import CustomTextInput from "~/components/CustomTextInput";
import { useForm, FormProvider } from "react-hook-form";
import { z, } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";

const invoiceInfoSchema = z.object({
    invoiceNumber: z.string({ required_error: 'Invoice number is required' }).min(1, "Invoice number is required"),
    date: z.string({ required_error: 'Date is required' }).min(1, "Date is required"),
    dueDate: z.string({ required_error: 'Due date is required' }).min(1, 'Due date is required'),
});

type InvoiceInfo = z.infer<typeof  invoiceInfoSchema>;


export default function GenerateInvoice() {
    const form = useForm<InvoiceInfo>({
        resolver: zodResolver(invoiceInfoSchema),
        defaultValues: {
            invoiceNumber: "2349478466473",
            date: new Date().toString(),
            dueDate: new Date().toString(),
        },
    });

    const onSubmit = (data: any) => {
       router.push('/invoice/generate/items');
    }

    return (
        <KeyboardAwareScrollView>
            <FormProvider {...form}>
            <Text className="mb-5 text-2xl font-bold">Invoice Info</Text>

            <View className="gap-2">
            <CustomTextInput name="name" label="Name" />
            <CustomTextInput name="address" label="Address" multiline />
            <CustomTextInput name="taxId" label="Tax ID" />
            </View>

            <Button title="Next" className="mt-auto" onPress={form.handleSubmit(onSubmit)} />
            </FormProvider>
            </KeyboardAwareScrollView>
    );
}












