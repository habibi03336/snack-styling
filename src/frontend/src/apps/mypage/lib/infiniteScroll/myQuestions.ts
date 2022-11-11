// import { infiniteScrollCallBackType } from "../../../../lib/types/infiniteScroll";
import { GET_USER_QUESTIONS } from "../../../../lib/api/user";
import * as I from "../../../../lib/types/interfaces";

async function myQuestions() {
  const res = await GET_USER_QUESTIONS();
  const data = res.data.questionResponses as I.StyleQ[];

  return [data, true] as [[], boolean];
}

export default myQuestions;
