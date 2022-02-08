export default class AnswerObj {
    constructor(question, answer, typeOfQuestion, indexOfQuestion) {
        this.answer = answer;
        this.question = question;
        this.typeOfQuestion = typeOfQuestion;
        this.indexOfQuestion = indexOfQuestion;
    }
}