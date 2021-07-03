import { Input, Stack } from "@chakra-ui/react";

const SearchField = ({ search, onInputChange, placeholder }) => (
  <Stack maxWidth="350px" mb={4}>
    <Input
      placeholder={placeholder}
      value={search}
      onChange={onInputChange}
    ></Input>
  </Stack>
)

export default SearchField;