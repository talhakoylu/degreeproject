import MsgBox from './MsgBox';
import { Box, Button, Stack } from '@chakra-ui/react';
import React from 'react';

export const DeleteAction = ({ onDelete, leftIcon, children, ...dist }) => {
  return (
    <MsgBox onApprove={onDelete}>
      {children}
    </MsgBox>
  );
};