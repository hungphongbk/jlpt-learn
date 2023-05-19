import { FieldHookConfig } from "formik/dist/Field";
import {
  FieldHelperProps,
  FieldInputProps,
  FieldMetaProps,
} from "formik/dist/types";
import { useField } from "formik";
import { useCallback } from "react";
import { uniq } from "lodash";

type SetArrayValueCb<Val> = (
  op: {
    add: Val[];
  },
  opt?: {
    uniqBy?: (v: Val) => any;
  },
  shouldValidate?: boolean
) => void;
type RT<Val = any> = [
  FieldInputProps<Val>,
  FieldMetaProps<Val>,
  FieldHelperProps<Val> & {
    setArrayValue: SetArrayValueCb<Val>;
  }
];

export default function useArrayField<V = any>(
  propsOrFieldName: string | FieldHookConfig<V>
): RT<V> {
  const [$1, $2, $3] = useField(propsOrFieldName);
  const { value } = $1,
    { setValue } = $3;

  const setArrayValue = useCallback<SetArrayValueCb<V>>(
    (op, opt = {}, shouldValidate) => {
      setValue(
        uniq([...(value as any[]), ...op.add]) as unknown as V,
        shouldValidate
      );
    },
    [setValue, value]
  );

  return [
    $1,
    $2,
    {
      ...$3,
      setArrayValue,
    },
  ];
}
