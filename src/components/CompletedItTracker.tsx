import { PrezziesHeading } from "./PrezziesHeader";

export function CompletedItTracker(props: {
  completedItOpportunity: {
    basePoints: number;
    numberOfCardsNeeded: number;
    card: string;
  };
  numOfDecks: 1 | 2;
}) {
  const numOfCardsNeeded = props.numOfDecks === 1 ? 4 : 8;

  return (
    <div className={` flex flex-col gap-2`}>
      <PrezziesHeading
        textColor="text-white"
        className={`text-xs tablet:text-sm md:text-2xl`}
        level={1}
      >
        Completed It
      </PrezziesHeading>
      <div className={`flex flex-row items-center gap-3`}>
        <div
          className={`w-8 h-10 border flex flex-row justify-center bg-blue-200 items-center`}
        >
          <p className={`text-black text-xs font-bold`}>Any</p>
        </div>
        <p className={`text-white text-end`}>x {numOfCardsNeeded}</p>
      </div>
      {props.completedItOpportunity.card !== "Any" && (
        <div className={`flex flex-row items-center gap-3`}>
          <div
            className={`w-8 h-10 border flex flex-row justify-center bg-blue-200 items-center`}
          >
            <p className={`text-black font-bold`}>
              {props.completedItOpportunity.card}
            </p>
          </div>
          <p className={`text-white text-end`}>
            x {props.completedItOpportunity.numberOfCardsNeeded}
          </p>
        </div>
      )}
    </div>
  );
}
