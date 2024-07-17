import { AnimatePresence, motion } from "framer-motion";

export const RulesModal = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (input: boolean) => void;
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="bg-slate-900/60 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer"
        >
          <motion.div
            initial={{ scale: 0, rotate: "12.5deg" }}
            animate={{ scale: 1, rotate: "0deg" }}
            exit={{ scale: 0, rotate: "0deg" }}
            onClick={(e) => e.stopPropagation()}
            className="bg-gradient-to-br from-red-100 to-blue-100  text-black p-10 rounded-lg w-full max-w-3xl shadow-xl cursor-default relative overflow-hidden"
          >
            <div className="relative  p-2 z-10">
              <h3 className="text-3xl font-bold text-center mb-2">
                President's Rules
              </h3>
              <ol className="list-decimal p-3">
                <li>
                  The goal is to be the first person to get rid of all your
                  cards.
                </li>
                <li>
                  Any higher single card beats a single card. A set of cards can
                  only be beaten by a higher set containing the same number of
                  cards. So for example if the previous player played two sixes
                  you can beat this with two kings, or two sevens, but not with
                  a single king, and not with three sevens (though you could
                  play two of them and hang onto the third).
                </li>
                <li>
                  It is not necessary to beat the previous play just because you
                  can - passing is always allowed. Also passing does not prevent
                  you from playing the next time your turn comes round.
                </li>
                <li>
                  The play continues as many times around the table as necessary
                  until someone makes a play which everyone else passes. All the
                  cards played are then turned face down and put to one side,
                  and the player who played last (and highest) to the previous
                  "trick" starts again by leading any card or set of equal
                  cards.
                </li>
                <li>
                  The first player who is out of cards is awarded the highest
                  social rank - this is President. The last player to be left
                  with any cards is known as the Scum.
                </li>
              </ol>

              <button
                onClick={() => setIsOpen(false)}
                className="bg-white hover:opacity-70 transition-opacity text-indigo-600 font-semibold w-full py-2 rounded"
              >
                Understood!
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
