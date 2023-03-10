function getFeedbackData(){
    var numOfWords = countWords()
    var rating = getRating()
    alert("Number of words in your feedback: " + numOfWords + "\nYour Rating: " + rating);
}

function countWords(){
    var text = document.getElementById("feedback").value;
    var numWords = 0;
    for (var i = 0; i < text.length; i++) {
        var currentCharacter = text[i];
        if (currentCharacter == " ") {
            numWords += 1;
        }
    }
    numWords += 1;
    return numWords.toString();
}

function getRating(){
    if (document.getElementById("1Star").checked == true){
        return "1";
    }else if (document.getElementById("2Star").checked == true){
        return "2";
    }else if (document.getElementById("3Star").checked == true){
        return "3";
    }else if (document.getElementById("4Star").checked == true){
        return "4";
    }else if (document.getElementById("5Star").checked == true){
        return "5";
    }
}

function switchTheme(){
    var website = document.body;
    if (website.classList.contains("lightMode")){
        return website.classList.toggle("darkMode");
    }else{
        return website.classList.toggle("lightMode");
    }
}