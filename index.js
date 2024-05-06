const step1 = document.querySelector(".step1"),
    step2 = document.querySelector(".step2"),
    step3 = document.querySelector(".step3"),
    emailAddress = document.getElementById("email"),
    verifyEmail = document.getElementById("verifyEmail"),
    inputs = document.querySelectorAll(".otp-group input"),
    nextButton = document.querySelector(".nextButton"),
    verifyButton = document.querySelector(".verifyButton");
let OTP;
window.addEventListener("load",() =>{
    emailjs.init("h5vt-zbbWDNGH76dc");
    step2.style.display = "none";
    step3.style.display = "none";
    nextButton.classList.add("disable");
    verifyButton.classList.add("disable");
});

const validateEmail = (email) => {
    let re = /\S+@\S+\.\S+/; // Corrected regular expression
    if(re.test(email)) {
        nextButton.classList.remove("disable");
    } else {
        nextButton.classList.add("disable");
    }
}

inputs.forEach((input, index, array) => {
    input.addEventListener("keyup", function(e) {
        if (input.value.length == 1) {
            if (index < array.length - 1) {
                array[index + 1].focus(); // Move focus to the next input
            }
        } else if (input.value.length == 0 && index > 0) {
            array[index - 1].focus(); // Move focus to the previous input
        }

        if(this.value.length >= 1) {
            e.target.value = e.target.value.substr(0,1);
        }
        // Check if all inputs have values
        const allInputsFilled = Array.from(array).every(input => input.value.length === 1);

        if (allInputsFilled) {
            verifyButton.classList.remove("disable"); // Enable verify button
        } else {
            verifyButton.classList.add("disable"); // Disable verify button
        }
    });
});


const generateOtp = () =>{
    let otp = Math.floor(100000 + Math.random() * 900000);
    return otp;
}

const seviceID ="service_jd8jkxg";
const templateID = "template_stss7li";

nextButton.addEventListener("click", () => {
    OTP = generateOtp();
    nextButton.innerHTML = "&#9889; Sending...";

    let templateParameter={
        from_name:"Ratan's Dev Community",
        OTP: OTP,
        message:"please find out the attached file",
        reply_to: emailAddress.value, 
    };
    emailjs.send(seviceID, templateID, templateParameter).then(
        (res)=> {
            console.log(res);
            nextButton.innerHTML = "SendOtp &rarr;";
            step1.style.display = "none";
            step2.style.display = "block";
            step3.style.display = "none";
        }
        ),
            (err) => {
                console.log(err);
            }
});


verifyButton.addEventListener("click", () => {
    let values="";
    inputs.forEach((input) => {
        values += input.value;
    });

    if(OTP ==values )
    {
        step1.style.display = "none";
        step2.style.display = "none";
        step3.style.display = "block";
    }
    else{
        verifyButton.classList.add("error-shake");

        setTimeout(() => {
            verifyButton.classList.remove("error-shake");
        }, 1000);
    }
});

function changeMyEmail () {
    step1.style.display = "block";
    step2.style.display = "none";
    step3.style.display = "none";
}


