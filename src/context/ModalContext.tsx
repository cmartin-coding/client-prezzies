import React, { ReactNode, useState } from "react";
import { useContext } from "react";

export const ModalContext = React.createContext<{
  modal: React.ReactElement | undefined;
  open: {
    isOpen: boolean;
    options: { isCannotClickBlurToClose?: boolean };
  };
  openModal: (
    el: JSX.Element | undefined,
    options?: { isCannotClickBlurToClose?: boolean }
  ) => void;
  closeModal: () => void;
}>(undefined as any);

export function ModalProvider(props: { children: ReactNode }) {
  const [modal, setModal] = useState<React.ReactElement | undefined>(undefined);
  const [open, setOpen] = useState<{
    isOpen: boolean;
    options: { isCannotClickBlurToClose?: boolean };
  }>({ isOpen: false, options: {} });

  return (
    <ModalContext.Provider
      value={{
        modal,
        open,

        openModal: (body, options) => {
          setModal(body);
          setOpen({ isOpen: true, options: options ? options : {} });
        },
        closeModal: () => {
          setOpen({ isOpen: false, options: {} });
        },
      }}
    >
      {props.children}
    </ModalContext.Provider>
  );
}

export const useModalContext = () => useContext(ModalContext);
