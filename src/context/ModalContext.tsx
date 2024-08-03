import React, { ReactNode, useState } from "react";
import { useContext } from "react";

export const ModalContext = React.createContext<
  | {
      modal: React.ReactElement | undefined;
      open: boolean;
      openModal: (el: JSX.Element | undefined) => void;
      closeModal: () => void;
    }
  | undefined
>(undefined);

export function ModalProvider(props: { children: ReactNode }) {
  const [modal, setModal] = useState<React.ReactElement | undefined>(undefined);
  const [open, setOpen] = useState<boolean>(false);

  return (
    <ModalContext.Provider
      value={{
        modal,
        open,

        openModal: (body) => {
          setModal(body);
          setOpen(true);
        },
        closeModal: () => {
          setOpen(false);
        },
      }}
    >
      {props.children}
    </ModalContext.Provider>
  );
}

export const useModalContext = () => useContext(ModalContext);
