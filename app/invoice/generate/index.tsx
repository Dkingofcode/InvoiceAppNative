import { View, Text, TextInput, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "~/components/Button";
import KeyboardAwareScrollView from  '~/components/KeyboardAwareScrollView';
import CustomTextInput from "~/components/CustomTextInput";
import { useForm, FormProvider } from "react-hook-form";
import { z, } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";

const senderInfoSchema = z.object({
    name: z.string({ required_error: 'Name is required'}).min(1, "Name is required"),
    address: z.string({ required_error: 'Address is required'}).min(1, "Address is required"),
    taxId: z.string().optional(),
});

type SenderInfo = z.infer<typeof  senderInfoSchema>;


export default function GenerateInvoice() {
    const form = useForm<SenderInfo>({
        resolver: zodResolver(senderInfoSchema),
        defaultValues: {
            name: "Andrea",
            address: "22, kingsway St, johannesburg, SA",
            taxId: '123456789'
        },


    });

    const onSubmit = (data: any) => {
       router.push('/invoice/generate/recipient');
    }

    return (
        <KeyboardAwareScrollView>
            <FormProvider {...form}>
            <Text className="mb-5 text-2xl font-bold">Sender Info</Text>

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












