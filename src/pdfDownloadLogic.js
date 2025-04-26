import jsPDF from "jspdf";
import resultFile from "./jsonData/jsonData.json";

export default function generatePdf() {
  const doc = new jsPDF();
  let y = 30;

  const pageHeight = doc.internal.pageSize.height; // important!

  doc.setTextColor(0, 0, 255);
  doc.text("Your Result", 80, y);

  doc.setTextColor(0, 0, 0);
  y += 10;

  resultFile.forEach((item, index) => {
    const questionText = `Q ${index + 1}: your_answer => ${item.answer}`;
    const correctAnswerText = `Correct_answer: ${item.correct_answer}`;

    const wrappedQuestion = doc.splitTextToSize(questionText, 180);
    const wrappedCorrectAnswer = doc.splitTextToSize(correctAnswerText, 180);

    // Check for page break before writing
    if (y + (wrappedQuestion.length + wrappedCorrectAnswer.length) * 10 > pageHeight - 20) {
      doc.addPage();
      y = 20; // Reset y for new page
    }

    doc.text(wrappedQuestion, 10, y);
    y += wrappedQuestion.length * 10;

    doc.text(wrappedCorrectAnswer, 10, y);
    y += wrappedCorrectAnswer.length * 10 + 10; // add some space after each question
  });

  doc.save("result.pdf");
}
