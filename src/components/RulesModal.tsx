import { useModalContext } from "../context/ModalContext";

export const RulesModal = () => {
  const modalCtx = useModalContext();
  const rules = [
    "The goal is to be the first person to get rid of all your cards.",
    "Any higher single card beats a single card. A set of cards can only be beaten by a higher set containing the same number of cards. So for example if the previous player played two sixes you can beat this with two kings, or two sevens, or any set of 3 or more cards, but not with a single king or two cards below six.",
    "It is not necessary to beat the previous play just because you can - passing is always allowed. Also passing does not prevent you from playing the next time your turn comes round.",
    "The play continues as many times around the table as necessary until someone makes a play which everyone else passes. All the cards played are then turned face down and put to one side, and the player who played last (and highest) to the previous 'trick' starts again by leading any card or set of equal cards.",
    "The first player who is out of cards is awarded the highest social rank - this is President. The last player to be left with any cards is known as the Scum.",
  ];

  return (
    <div className="relative  p-2 z-10">
      <h3 className="tablet:text-3xl text-md font-bold text-center mb-2">
        President's Rules
      </h3>
      <ol className="list-decimal flex flex-col gap-4 p-3">
        {rules.map((r) => (
          <li key={r} className={`tablet:text-md text-sm`}>
            {r}
          </li>
        ))}
      </ol>

      <button
        onClick={() => {
          modalCtx?.closeModal();
        }}
        className="bg-white hover:opacity-70 transition-opacity text-indigo-600 font-semibold w-full py-2 rounded"
      >
        Understood!
      </button>
    </div>
  );
};
