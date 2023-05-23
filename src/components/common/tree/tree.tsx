import {
  forwardRef,
  memo,
  useContext,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import {
  Box,
  Button,
  chakra,
  Code,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { UITreeNode } from "./uiTreeNode";
import { TreeNode, TreeProps } from "@/src/components/common/tree/utils";
import { Maybe } from "@/types";
import { TagTreeContext } from "@/src/components/common/tree/context";
import { Field, Formik } from "formik";
import { graphql } from "@/src/graphql-client";
import { useMutation } from "@apollo/client";
import { QUERY_ALL_TAGS } from "@/src/components/gql";

const ADMIN_UPSERT_TAG = graphql(/*GraphQL*/ `
  mutation AdminUpsertTag($input: TagUpsertInput!) {
    upsertTag(tag: $input) {
      id
    }
  }
`);

const AddChildForTag = () => {
  const { addChildForTag, setAddChildForTag } = useContext(TagTreeContext);

  const [mutate] = useMutation(ADMIN_UPSERT_TAG, {
    refetchQueries: [QUERY_ALL_TAGS],
  });

  return (
    <Modal
      isOpen={Boolean(addChildForTag)}
      onClose={() => setAddChildForTag?.(undefined)}
    >
      <ModalOverlay />
      <ModalContent>
        <Formik
          initialValues={{ id: "", label: "" }}
          onSubmit={async (values) => {
            await mutate({
              variables: { input: { ...values, parentId: addChildForTag! } },
            });
            setAddChildForTag?.(undefined);
          }}
        >
          {(props) => (
            <>
              <ModalHeader>Thêm tag con</ModalHeader>
              <ModalBody>
                <Code>{addChildForTag}</Code>
                <FormControl>
                  <FormLabel>ID tag</FormLabel>
                  <Field name={"id"} as={Input} />
                </FormControl>
                <FormControl>
                  <FormLabel>Tên tag</FormLabel>
                  <Field name={"label"} as={Input} />
                </FormControl>
              </ModalBody>
              <ModalFooter>
                <Button
                  type={"submit"}
                  isLoading={props.isSubmitting}
                  onClick={props.submitForm}
                >
                  OK
                </Button>
              </ModalFooter>
            </>
          )}
        </Formik>
      </ModalContent>
    </Modal>
  );
};

export const Tree = memo(
  forwardRef(function Tree(props: TreeProps, ref) {
    const elementRef = useRef<any>(null);

    useImperativeHandle(ref, () => ({
      props,
      getElement: () => elementRef.current,
    }));

    const getRootNode = (): TreeNode[] => {
      return props.value ?? [];
    };

    const createRootChild = (
      node: TreeNode,
      index: number,
      last: boolean
    ): JSX.Element => (
      <UITreeNode
        key={node.key}
        index={index}
        root={getRootNode()}
        node={node}
        last={last}
        path={String(index)}
        isReadOnly={props.isReadOnly ?? false}
        isDisabled={props.isDisabled ?? false}
      />
    );

    const createRootChildren = (): JSX.Element[] => {
      const value = getRootNode();
      return value.map((node: any, index: number) =>
        createRootChild(node, index, index === value.length - 1)
      );
    };

    const createModel = (): Maybe<JSX.Element> => {
      if (!props.value) return null;

      const rootNodes = createRootChildren();

      return (
        <chakra.ul
          role="tree"
          sx={{
            listStyleType: "none",
          }}
        >
          {rootNodes}
        </chakra.ul>
      );
    };

    const [addChildForTag, setAddChildForTag] = useState<string | undefined>(
      undefined
    );

    return (
      <TagTreeContext.Provider value={{ addChildForTag, setAddChildForTag }}>
        <Box ref={elementRef}>{createModel()}</Box>
        <AddChildForTag />
      </TagTreeContext.Provider>
    );
  })
);
