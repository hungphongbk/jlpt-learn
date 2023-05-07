import { forwardRef, ReactNode, Ref } from "react";
import { FormControl, FormLabel, Input, InputProps } from "@chakra-ui/react";

const TextField = forwardRef(function TextField(
  {
    label,
    className,
    id,
    ...props
  }: InputProps & {
    label: string;
  },
  ref: Ref<HTMLInputElement>
) {
  return (
    <FormControl className={className}>
      <FormLabel htmlFor={id}>{label}</FormLabel>
      <Input ref={ref} id={id} {...props} />
    </FormControl>
  );
});

export default TextField;
