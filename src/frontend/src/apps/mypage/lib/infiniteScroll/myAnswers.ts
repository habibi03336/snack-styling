import { GET_USER_ANSWERS } from "../../../../lib/api/user";
import * as I from "../../../../lib/types/interfaces";

async function myAnswers() {
  const res = await GET_USER_ANSWERS();
  const data = res.data.questionResponses as I.StyleQ[];

  return [data, true] as [[], boolean];
}

export default myAnswers;
