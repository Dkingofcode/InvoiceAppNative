import { View, Text, TextInput, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "~/components/Button";
import KeyboardAwareScrollView from  '~/components/KeyboardAwareScrollView';
import CustomTextInput from "~/components/CustomTextInput";
import { useForm, FormProvider, useFieldArray } from "react-hook-form";
import { z, } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";

const invoiceItemSchema = z.object({
    name: z.string({ required_error: 'Name is required'}).min(1, "Name is required"),
    quantity: z.number({ required_error: 'Quantity is required' }).min(1, "Quantity is required"),
    price: z.number({ required_error: 'Price is required' }).min(1, 'Price is required'),
});

type InvoiceItem = z.infer<typeof  invoiceItemSchema>;

const itemsSchema = z.array(invoiceItemSchema);

type Items = z.infer<typeof itemsSchema>;

export default function GenerateInvoice() {
    const form = useForm<Items>({
        resolver: zodResolver(itemsSchema),
        defaultValues: {
          items: [
            {
            name: "Wirter",
            quantity: 2,
            price: 123.567
            }
            ]
            
        },
    });

    const {fields, append} = useFieldArray({
        control: form.control,
        name: 'items'
    });

    console.log(form.getValues());

    const onSubmit = (data: any) => {
       router.push('/invoice/generate/recipient');
    };

    return (
        <KeyboardAwareScrollView>
            <FormProvider {...form}>
            <Text className="mb-5 text-2xl font-bold">Items</Text>

            <View className="gap-3 shadow">
               {fields.map((_, index) => (
                  <View key={index} className="gap-3 rounded-lg bg-gray-50 p-4">
                    <Text className="text-lg font-semibold">Item {index + 1}</Text>
                    <CustomTextInput name={`items.${index}.name`} label="Name" />
 
                    <View className="flex-row gap-3">
                    <View className="flex-1">
                    <CustomTextInput  
                     name={`items.${index}.price`}
                     label="Price"
                     keyboardType="numeric"
                     onChangeText={(value) => {
                         form.setValue(`items.${index}.price`, Number(value));
                        }}
                    />
                 </View>

                  <View className="flex-1">
                    <CustomTextInput 
                      name={`${index}.quantity`}
                      label="Quantity"
                      keyboardType="numeric"
                      onChangeText={(value) => {
                        form.setValue(`items.${index}.quantity`, Number(value));
                      }}
                    />
                    </View>

                    <View className="flex-1 bg-red-400">
                        <Text className="text-lg">Total</Text>
                        <Text className="mt-4 text-lg">
                            $
                            {(form.watch(`items.${index}.price`) || 0) * 
                            (form.watch(`items.${index}.quantity`) || 0)}
                        </Text>
                    </View>
                    </View>
                    </View>
               ))}
               </View>

            

            <Button title="Add Item" 
              className="mt-3" 
              onPress={() => { 
              const currentItems = form.getValues(); 
                form.setValue(`items.${currentItems.items.length}`, {
                    name: '',
                    quantity: 1,
                    price: 0,
                })
                }
              } 
              />
            </FormProvider>
            </KeyboardAwareScrollView>
    );
}












