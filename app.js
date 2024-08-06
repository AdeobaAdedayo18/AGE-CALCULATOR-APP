const form = document.getElementById("form");
const year = document.getElementById("year");
const month = document.getElementById("month");
const day = document.getElementById("day");
const yearsAnswers = document.getElementById("years-answers");
const monthsAnswers = document.getElementById("months-answers");
const daysAnswers = document.getElementById("days-answers");

form.addEventListener("submit", e=>{
    e.preventDefault();

    if(validInput()){
        console.log("All Inputs are valid");
        submitSucess();
    }
})


function submitSucess(){
    const { yearDifference, monthDifference, dayDifference } = calculateAge();
    yearsAnswers.innerText = yearDifference;
    monthsAnswers.innerText = monthDifference;
    daysAnswers.innerText = dayDifference;
}

function calculateAge() {
    const currentDate = new Date();

    let currentYear = currentDate.getFullYear();
    let currentMonth = currentDate.getMonth() + 1; // getMonth() returns 0-11, so add 1
    let currentDay = currentDate.getDate();

    const yearValueInt = parseInt(year.value.trim());
    const monthValueInt = parseInt(month.value.trim());
    const dayValueInt = parseInt(day.value.trim());

    // If the birth date is in the future within the same year
    if (yearValueInt === currentYear && (monthValueInt > currentMonth || (monthValueInt === currentMonth && dayValueInt > currentDay))) {
        return {
            yearDifference: 0,
            monthDifference: 0,
            dayDifference: 0
        };
    }

    let yearDifference = currentYear - yearValueInt;
    let monthDifference = currentMonth - monthValueInt;
    let dayDifference = currentDay - dayValueInt;

    if (dayDifference < 0) {
        monthDifference -= 1;
        dayDifference += new Date(currentYear, currentMonth - 1, 0).getDate(); // days in the previous month
    }

    if (monthDifference < 0) {
        yearDifference -= 1;
        monthDifference += 12;
    }

    return {
        yearDifference: yearDifference,
        monthDifference: monthDifference,
        dayDifference: dayDifference
    };
}



function setError(element, message){
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector(".error");

    inputControl.classList.add("error");
    errorDisplay.innerText = message;

}
function setSuccess(element){
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector(".error");

    inputControl.classList.remove("error");
    errorDisplay.innerText = "";

}


function validInput(){
    const yearValueInt = parseInt(year.value.trim());
    const monthValueInt = parseInt(month.value.trim());
    const dayValueInt = parseInt(day.value.trim());

    const yearValue = year.value.trim();
    const monthValue = month.value.trim();
    const dayValue = day.value.trim();

    let isValid = true

    
    if (
        yearValue === "" ||
        (yearValueInt > new Date().getFullYear() && (setError(year, "Must be a valid year"), true)) ||
        monthValue === "" ||
        (monthValueInt < 1 || monthValueInt > 12 && (setError(month, "Must be a valid month"), true)) ||
        dayValue === "" ||
        (dayValueInt < 1 || dayValueInt > 31 && (setError(day, "Must be a valid day"), true)) ||
        (
            (monthValueInt === 4 || monthValueInt === 6 || monthValueInt === 9 || monthValueInt === 11) &&
            dayValueInt > 30 && (setError(day, "Must be a valid day"), true)
        ) ||
        (
            monthValueInt === 2 &&
            (
                ((yearValueInt % 4 === 0 && yearValueInt % 100 !== 0) || (yearValueInt % 400 === 0))
                    ? dayValueInt > 29 && (setError(day, "Must be a valid day"), true)
                    : dayValueInt > 28 && (setError(day, "Must be a valid day"), true)
            )
        )
    ) {
        if (yearValue === "") {
            setError(year, "This field is empty");
        }
        if (monthValue === "") {
            setError(month, "This field is empty");
        }
        if (dayValue === "") {
            setError(day, "This field is empty");
        }
        isValid = false;
    } else {
        setSuccess(year);
        setSuccess(month);
        setSuccess(day);
        isValid = true;
    }
    
    return isValid;
}