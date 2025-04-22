var canvas = document.getElementById("progress-canvas");
var context = canvas.getContext("2d");
var totalTime = 120;
var timeRemaining = totalTime;
var radius = 40;
var lineWidth = 5;
var timerInterval;
var otpGenerator = Math.floor(100000 + Math.random() * 900000)
var otpSenttoUser

mdc.autoInit();

function formatTime(seconds) {
    var minutes = Math.floor(seconds / 60);
    var remainingSeconds = seconds % 60;
    return minutes + ":" + (remainingSeconds < 10 ? "0" : "") + remainingSeconds;
}

function drawTimer() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    var startingPoint = 1.5 * Math.PI;

    context.beginPath();
    context.arc(
        canvas.width / 2,
        canvas.height / 2,
        radius,
        startingPoint,
        (startingPoint + 2 * Math.PI * (timeRemaining) / totalTime) % (2 * Math.PI),
        false
    );
    context.lineWidth = lineWidth;
    context.strokeStyle = "#3498db";
    context.stroke();

    context.font = "16px Arial";
    context.fillStyle = "#3498db";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText(formatTime(timeRemaining), canvas.width / 2, canvas.height / 2);
}

function updateTimer() {
    drawTimer();
    timeRemaining--;

    if (timeRemaining >= 0) {
        timerInterval = setTimeout(updateTimer, 1000);
    } else {
        alert("Time's up!");
        closeOTPModal();
    }
}

function startTimer() {
    timeRemaining = totalTime;
    updateTimer();
}

function clearTimer() {
    clearTimeout(timerInterval);
}

function openOTPModal() {
    document.getElementById('otpModal').style.display = 'block';
    startTimer();
}

function closeOTPModal() {
    document.getElementById('otpModal').style.display = 'none';
    clearTimer();
}

function verifyOTP() {
    var otpfromUser = $('#otpInput1').val() + $('#otpInput2').val() +
        $('#otpInput3').val() + $('#otpInput4').val() + $('#otpInput5').val() + $('#otpInput6').val();

    console.log(otpSenttoUser, otpfromUser)

    if (otpSenttoUser.toString() === otpfromUser.toString()) {
        alert('OTP verified successfully!');
        closeOTPModal();
    } else {
        alert('Invalid OTP. Please try again.');
    }
}

function signup() {

    otpSenttoUser = otpGenerator

    const reqBody = {
        name: document.getElementById('firstname').value + document.getElementById('lastname').value,
        email: document.getElementById('email').value,
        mobile: document.getElementById('mobile').value,
        otp: otpSenttoUser
    };

    if (document.getElementById('firstname').value + document.getElementById('lastname').value
        && document.getElementById('email').value && document.getElementById('mobile').value) {
        axios.post("http://localhost/signup", reqBody, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                console.log(response)
                openOTPModal();
            })
            .catch(error => {
                console.log(error)
                openOTPModal();
                alert('Failed to send OTP. Please try again.');
            });
    } else {
        alert('Please fill all the details as mentioned.');
    }

}

$(document).ready(function () {
    $('.otp-input').on('input', function () {
        var maxLength = parseInt($(this).attr('maxlength'));
        var currentLength = $(this).val().length;

        if (currentLength === maxLength) {
            var nextInput = $(this).next('.otp-input');
            if (nextInput.length > 0) {
                nextInput.focus();
            }
        }
    });

    $('.otp-input').on('keydown', function (e) {
        if (e.which === 8 || e.which === 46) {
            if ($(this).val() == '') {
                if ($(this).prev('.otp-input').length > 0) {
                    $(this).prev('.otp-input').focus();
                    $(this).prev('.otp-input').val('');
                }
            } else {
                $(this).val('');
            }
        }
    });

    $('.otp-input').on('paste', function (e) {
        e.preventDefault();

        var pastedText = e.originalEvent.clipboardData.getData('text');
        var maxLength = 6;

        for (var i = 0; i < maxLength; i++) {
            $('#otpInput' + (i + 1)).val(pastedText.charAt(i) || '');
        }
    });
});