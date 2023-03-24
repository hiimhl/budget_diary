import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Wrapper } from "../routes/Home";
import { IState } from "../store";
import DetailItem from "./UI/DetailItem";

function DetailPage() {
  const { date: pageDate, id, type } = useParams();

  const diary = useSelector((state: IState) => state.data.diary[pageDate!]);

  const budgetBook = useSelector((state: IState) =>
    state.data.budgetBook[pageDate!].find((item) => item.id === id)
  );

  const schedule = useSelector((state: IState) =>
    state.data.schedule[pageDate!].find((item) => item.id === id)
  );

  return (
    <Wrapper>
      {type === "diary" && diary && <DetailItem type="diary" data={diary} />}
      {type === "budgetBook" && budgetBook && (
        <DetailItem type="budget" data={budgetBook} />
      )}
      {type === "schedule" && schedule && (
        <DetailItem type="schedule" data={schedule} />
      )}
    </Wrapper>
  );
}

export default DetailPage;
