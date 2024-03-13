import React, { useState } from "react";
import { Box, Button, Container, FormControl, FormLabel, Input, Select, CheckboxGroup, Checkbox, Stack, Textarea, useToast, VStack, InputGroup, InputLeftAddon, Heading, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, useDisclosure } from "@chakra-ui/react";
import { FaUpload, FaPaperPlane } from "react-icons/fa";

const Index = () => {
  const [form, setForm] = useState({
    sampleType: "",
    colors: [],
    logo: null,
    name: "",
    email: "",
    phone: "",
    companyName: "",
    lineSpeed: "",
    printSize: "",
  });
  const [uniqueNumber, setUniqueNumber] = useState(null);
  const [isPreview, setIsPreview] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handlePreview = () => {
    setIsPreview(true);
  };

  const handleEdit = () => {
    setIsPreview(false);
  };
  const toast = useToast();

  const handleColorChange = (selectedColors) => {
    setForm({ ...form, colors: selectedColors });
  };

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setForm({ ...form, [name]: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUniqueNumber = Date.now();
    setUniqueNumber(newUniqueNumber);
    onOpen();
    if (isPreview) {
      setIsPreview(false);
      return;
    }
    toast({
      title: "Form submitted.",
      description: "We've received your sample request.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  //... rest of the existing return statement up to the <Container>

  const shippingLabel = (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Shipping Label</ModalHeader>
        <ModalBody>
          <Box p={5} border="1px" borderColor="gray.200" borderRadius="md" boxShadow="sm">
            <Heading size="md" mb={2}>
              Cyklop CSC Att.: SampleLab M.Slot {uniqueNumber}
            </Heading>
            <Box>
              Wilhelm Röntgenstraat 10
              <br />
              8013NC Zwolle
              <br />
              Nederland
            </Box>
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={() => window.print()}>
            Print Label
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );

  return (
    <>
      {shippingLabel}
      <Container maxW="container.md" py={10}>
        <form onSubmit={handleSubmit}>
          <FormControl id="sampleType" mb={4}>
            <FormLabel>Sample Type</FormLabel>
            <Select name="sampleType" value={form.sampleType} onChange={handleInputChange}>
              <option value="">Select Sample Type</option>
              <option value="Printed">Printed</option>
              <option value="Blank">Blank</option>
            </Select>
          </FormControl>
          <FormControl id="colors" mb={4}>
            <FormLabel>Colors</FormLabel>
            <CheckboxGroup colorScheme="blue" value={form.colors} onChange={handleColorChange}>
              <Stack spacing={2} direction="row">
                <Checkbox value="Red">Red</Checkbox>
                <Checkbox value="Blue">Blue</Checkbox>
                <Checkbox value="Green">Green</Checkbox>
                <Checkbox value="Yellow">Yellow</Checkbox>
              </Stack>
            </CheckboxGroup>
          </FormControl>
          <FormControl id="logo" mb={4}>
            <FormLabel>Logo</FormLabel>
            <Input type="file" name="logo" onChange={handleInputChange} />
          </FormControl>
          <FormControl id="name" mb={4}>
            <FormLabel>Contact Name</FormLabel>
            <Input type="text" name="name" value={form.name} onChange={handleInputChange} />
          </FormControl>
          <FormControl id="email" mb={4}>
            <FormLabel>Email</FormLabel>
            <Input type="email" name="email" value={form.email} onChange={handleInputChange} />
          </FormControl>
          <FormControl id="phone" mb={4}>
            <FormLabel>Phone</FormLabel>
            <InputGroup>
              <InputLeftAddon children="+31" />
              <Input type="tel" name="phone" value={form.phone} onChange={handleInputChange} />
            </InputGroup>
          </FormControl>
          <FormControl id="companyName" mb={4}>
            <FormLabel>Company Name</FormLabel>
            <Input type="text" name="companyName" value={form.companyName} onChange={handleInputChange} />
          </FormControl>
          <FormControl id="lineSpeed" mb={4}>
            <FormLabel>Line Speed</FormLabel>
            <Select name="lineSpeed" value={form.lineSpeed} onChange={handleInputChange}>
              <option value="">Select Line Speed</option>
              <option value="Slow">Slow</option>
              <option value="Medium">Medium</option>
              <option value="Fast">Fast</option>
            </Select>
          </FormControl>
          <FormControl id="printSize" mb={4}>
            <FormLabel>Print Size</FormLabel>
            <Select name="printSize" value={form.printSize} onChange={handleInputChange}>
              <option value="">Select Print Size</option>
              <option value="Small">Small</option>
              <option value="Medium">Medium</option>
              <option value="Large">Large</option>
            </Select>
          </FormControl>
          <FormControl id="additionalInfo" mb={4}>
            <FormLabel>Additional Info</FormLabel>
            <Textarea name="additionalInfo" value={form.additionalInfo} onChange={handleInputChange} />
          </FormControl>
        </form>
        {isPreview ? (
          <VStack spacing={4} align="stretch" mt={4}>
            <Box>Sample Type: {form.sampleType}</Box>
            <Box>Selected Colors: {form.colors.join(", ")}</Box>
            <Box>Contact Name: {form.name}</Box>
            <Box>Email: {form.email}</Box>
            <Box>Phone: {form.phone}</Box>
            <Box>Company Name: {form.companyName}</Box>
            <Box>Line Speed: {form.lineSpeed}</Box>
            <Box>Print Size: {form.printSize}</Box>
            <Button colorScheme="blue" onClick={handleEdit}>
              Back to Edit
            </Button>
            <Button colorScheme="blue" onClick={handleSubmit}>
              Confirm and Submit
            </Button>
          </VStack>
        ) : (
          <>
            {/* ... rest of the existing JSX for the form */}
            <Button colorScheme="blue" onClick={handlePreview}>
              Preview
            </Button>
            <Button colorScheme="blue" onClick={handleSubmit}>
              Submit
            </Button>
          </>
        )}
      </Container>
    </>
  );
};

export default Index;
