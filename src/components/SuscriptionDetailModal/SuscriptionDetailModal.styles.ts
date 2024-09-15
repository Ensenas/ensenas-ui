import styled from 'styled-components';

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

export const ModalContent = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  max-width: 90%;
  max-height: 80%;
  position: relative;
`;

export const ModalTitle = styled.h2`
  margin: 0;
  padding-bottom: 10px;
`;

export const ModalBody = styled.div`
  text-align: left;
`;

export const ModalCloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #333;
`;
