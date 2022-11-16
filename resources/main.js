(() => {
        //Variables HTML
const scorePoints = document.querySelector('#numberPoints');
const questionDiv = document.querySelector(".questionDiv");
const answerDiv = document.querySelector('.answerDiv');


const fetchQuestion = async (id) => {
    await fetch('https://opentdb.com/api.php?amount=30&difficulty=easy')
    .then( res => res.json())
    .then( res => createQuestionAndAnswers(res))
    .catch( err => console.error(err))
};

fetchQuestion(0)

const createQuestionAndAnswers = (archiveJson) => {
    const question = document.createElement('h3');
    question.innerHTML = `${archiveJson.results[0].question}`;
    question.classList.add('question')
    questionDiv.appendChild(question);

    let posibble = [];
    posibble.push(archiveJson.results[0].incorrect_answers);
    posibble[0].push(archiveJson.results[0].correct_answer)
    let psibles =_.shuffle(posibble[0])

    var score = 1

    for(let i = 0 ; i < psibles.length ; i++){
        const posibbleAnswer = document.createElement('buttton');
        posibbleAnswer.className = 'posibbleAnswer';
        const answerParagraph = document.createElement('p');
        answerParagraph.className = "answerParagraph";
        answerParagraph.innerHTML = `${psibles[i]}`;
        
        posibbleAnswer.addEventListener('click', () => { 
            if( answerParagraph.innerHTML === archiveJson.results[0].correct_answer){
                score++
                scorePoints.innerHTML = "";
                scorePoints.innerHTML = `${score}`
                alert("Excelent");
                answerDiv.innerHTML = "";
                questionDiv.innerHTML = "";
                fetchQuestion(score);
            } else {
                answerDiv.innerHTML = "";
                questionDiv.innerHTML = "";
                fetchQuestion(score);
                alert("Try Again");
            };
        })

        posibbleAnswer.appendChild(answerParagraph);
        answerDiv.append(posibbleAnswer);
    }
}
})()