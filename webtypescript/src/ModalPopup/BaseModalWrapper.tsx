import React, { MouseEventHandler, ReactNode } from 'react'
import Modal from './Modal';
import { DesktopModalContainer, Header, Message} from './ModalPopup.styles'

export interface BaseModalWrapperProps {
  isModalVisible: boolean;
  onBackdropClick: () => void;
}

const BaseModalWrapper: React.FC<BaseModalWrapperProps> = ({onBackdropClick, isModalVisible}) => {
  
  if(!isModalVisible) {
    return null
  }

    return (<Modal onBackdropClick={onBackdropClick}>
        <DesktopModalContainer>
            <Header>Email info</Header>
            <div>
                <Message>You are invited to Engage!</Message>
                <Message>Here is a link to download app:</Message>
                <Message>Enter this access code to join the study:</Message>
            </div>
        </DesktopModalContainer>
    </Modal>);
}

export default BaseModalWrapper