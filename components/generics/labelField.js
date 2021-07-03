import { Text, Flex } from "@chakra-ui/react";

const LabelField = ({ label, value }) => (
  <Flex direction="row">
    <Text fontSize="20px" color="tomato" className={'title'} pr={5}>{label}</Text>
    <Text fontSize="20px">{value} </Text>
  </Flex>
)

export default LabelField;