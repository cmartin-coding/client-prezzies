import { AnimatePresence, motion } from "framer-motion";
import { useModalContext } from "../../context/ModalContext";

export function GlobalModal() {
  const modalCtx = useModalContext();

  return (
    <AnimatePresence>
      {modalCtx?.open.isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            if (!modalCtx.open.options.isCannotClickBlurToClose) {
              modalCtx.closeModal();
            }
          }}
          className={`bg-slate-900/40 backdrop-blur-lg p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll ${
            modalCtx.open.options.isCannotClickBlurToClose
              ? "cursor-default"
              : "cursor-pointer"
          }`}
        >
          <motion.div
            initial={{ scale: 0, rotate: "12.5deg" }}
            animate={{ scale: 1, rotate: "0deg" }}
            exit={{ scale: 0, rotate: "0deg" }}
            transition={{
              stiffness: 500,
              damping: 30,
              duration: 0.3,
            }}
            // transition={{
            //   type: "spring",
            //   stiffness: 500,
            //   damping: 30,
            //   duration: 10,
            // }}
            onClick={(e) => e.stopPropagation()}
            className="backdrop-blur-md bg-white/80 text-black p-10 rounded-lg w-full max-w-3xl  cursor-default relative overflow-hidden"
          >
            {modalCtx.modal}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
