"use client";
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
  AutoCompleteTag,
} from "@choc-ui/chakra-autocomplete";
import { useQuery } from "@apollo/client";
import { useField } from "formik";
import { QUERY_ALL_TAGS } from "@/src/components/gql";

export default function TagAutocomplete({ name }: { name: string }) {
  const [_, { value }, { setValue }] = useField(name);
  const { data } = useQuery(QUERY_ALL_TAGS);
  return (
    <AutoComplete
      openOnFocus
      multiple
      value={value}
      onChange={(val) => setValue(val)}
    >
      <AutoCompleteInput variant="filled">
        {({ tags }) =>
          tags.map((tag, tid) => (
            <AutoCompleteTag
              key={tid}
              label={tag.label}
              onRemove={tag.onRemove}
              className={"bg-sky-200"}
            />
          ))
        }
      </AutoCompleteInput>
      <AutoCompleteList>
        {data?.tags?.map(({ id }: any) => (
          <AutoCompleteItem
            key={`option-${id}`}
            value={id}
            textTransform="capitalize"
            _selected={{ bg: "whiteAlpha.50" }}
            _focus={{ bg: "whiteAlpha.100" }}
          >
            {id}
          </AutoCompleteItem>
        ))}
      </AutoCompleteList>
    </AutoComplete>
  );
}
