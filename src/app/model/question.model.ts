export interface Question {
  questionId: number;
  content: string;
  options: {
    [optionName: string]: number
  };
}
