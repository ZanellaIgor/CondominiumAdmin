export const mapperAnswer = (data: any, id: number) => {
  return {
    questions:
      data?.questions?.map((q: any) => ({ questionId: q.id, answer: '' })) ||
      [],
    surveyId: Number(id),
  };
};
