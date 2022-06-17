import {
    Modal as CUIModal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,Button,
    ModalOverlay,
  } from '@chakra-ui/react';
  import React from 'react';
  
  export const Modal = ({
    title,
    body,
    fetching = false,
    children,
    isOpen,
    onOpen,
    onClose,
    hideFooter = false,
    modalOk = false,
    ok,
    noBody,
    size,
    okTitle = 'Tamam',
    ...dist
  }) => {
    const maxWidthProps = size === 'xl' ? { maxWidth: '1000px' } : {};
  
    // @ts-ignore
    return (
      <CUIModal isOpen={isOpen} onClose={onClose} {...dist}>
        <ModalOverlay />
        <ModalContent pb={4} {...maxWidthProps}>
          {title && (
            <>
              <ModalHeader>{title}</ModalHeader>
              <ModalCloseButton />
            </>
          )}
          {!noBody ? <ModalBody>{children}</ModalBody> : children}
          {!hideFooter && (
            <ModalFooter pb={1}>
              <Button colorScheme={'gray'} ml={3} onClick={onClose}>
                Kapat
              </Button>
              {modalOk && (
                <Button
                  isLoading={fetching}
                  ml={3}
                  onClick={() => {
                    ok();
                  }}>
                  {okTitle}
                </Button>
              )}
            </ModalFooter>
          )}
        </ModalContent>
      </CUIModal>
    );
  };
  