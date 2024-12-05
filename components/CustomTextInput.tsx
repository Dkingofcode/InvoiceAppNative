import { PropsWithChildren } from 'react';
import { Text, View, TextInput, TextInputProps } from 'react-native';
import { Control, Controller, useController } from 'react-hook-form';

type CustomTextInputProps = {
    name: string;
    label: string;
} & TextInputProps;

const CustomTextInput = ({ label, name, ...props }: CustomTextInputProps) => {
 const { field, fieldState: { error }, } = useController({ name });
 
    return (
        <View className="gap-2">
        <Text className="text-lg">{label}</Text>
        <TextInput {...props} className={`rounded border border-gray-300 p-4 ${props.className}`} 
        />
       <Text className="text-red-500">{error?.message}</Text>
    </View>
  );
}

export default CustomTextInput;