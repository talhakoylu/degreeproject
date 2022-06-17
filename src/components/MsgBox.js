import {Box, Text, useDisclosure } from '@chakra-ui/react';
import React, { useState } from 'react';
import { Modal } from './Modal';
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const MsgBox = ({
  children,
  title = 'Uyarı',
  description = 'Bu işlemi onaylıyor musunuz?',
  onApprove,
  disabled,
  ...dist
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [fetching, setFetching] = useState(false);

  return (
    <Box
      sx={
        disabled && {
          opacity: '0.4',
        }
      }
      {...dist}>
      <Modal
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        title={title}
        modalOk={true}
        fetching={fetching}
        ok={async () => {
          setFetching(true);
          await onApprove()
            .then(() => {
              onClose();
              setFetching(false);
            })
            .catch((e) => {
              setFetching(false);
            });
        }}>
        <Text color={'gray'}>{description}</Text>
      </Modal>
      <div onClick={!disabled ? onOpen : () => {}}>{children}</div>
    </Box>
  );
};

export default MsgBox;
