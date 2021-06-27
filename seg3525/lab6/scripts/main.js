$(document).ready(() => {
    $("#datepicker").datepicker({
        "defaultDate": 1,
        "minDate": 1,
        "showOtherMonths": true,
        "selectOtherMonths": true,
        "beforeShowDay": function (date) {
            const vet = $("#expert").val();
            const day = date.getDay();
            if (workingOnDays[vet]) {
                return [workingOnDays[vet].includes(day)];
            } else {
                return [[1, 2, 3, 4, 5, 6].includes(day)];
            }
        },
    }).change(function () {
        let day = new Date($(this).val()).getDay();
        if (day) {
            $("#timepicker").timepicker("option", "minTime", appointmentTimes[day][0])
                .timepicker("option", "maxTime", appointmentTimes[day][1])
                .val("");
        } else {
            $("#timepicker").val("");
        }
    });

    $("#timepicker").timepicker({
        "minTime": "8:00am",
        "maxTime": "5:00pm",
        "listWidth": 1,
    }).on("timeFormatError", function () {
        addError(false, "timepicker")
    }).on("timeRangeError", function () {
        addError(false, "timepicker");
    }).on("changeTime", function () {
        removeError(false, "timepicker");
    }).change(function () {
        if ($(this).val()) {
            removeError(false, "timepicker");
        } else {
            addError(false, "timepicker");
        }
    })

    $("#bookModal").on("hidden.bs.modal", () => {
        $("#book-form").trigger("reset");
        $("#expert").val("No preference");
        removeInvalidFeedback();
    });

    $("#expert").change(function () {
        $("#datepicker").val("").change();
    });

    $("#book-form-submit").click(function () {
        $("#confirmationModalLabel").text(`Thanks for booking, ${$("#name").val().split(" ")[0]}!`);
        $("#confirmation-text").text(`Your appointment has been booked for ${$("#datepicker").val()} at ${$("#timepicker").val()}.`);
        $("#confirmation-email").text(`We have sent a confirmation email to ${$("#book-form .email").val()}.`);
    });

    $("#book-form").change(function () {
        if ($("#book-form input").hasClass("form-control-invalid")) {
            $("#book-form-error").show().text("You have errors. Please correct them before submitting.");
        } else {
            $("#book-form-error").hide();
        }
    })
        .submit(function () {
            if ($("#book-form .required-simple").val() == "") {
                $("#book-form-error").show().text("You have errors. Please correct them before submitting.");
                if ($("#book-form #name").val() === "") {
                    addError(false, "name");
                }
                if ($("#book-form #datepicker").val() === "") {
                    addError(false, "datepicker");
                }
                if ($("#book-form #timepicker").val() === "") {
                    addError(false, "timepicker");
                }
                if ($("#book-form .email").val() === "") {
                    addError(true, "email");
                }
                if ($("#book-form .phone").val() === "") {
                    addError(true, "phone");
                }
                if ($("#book-form #credit-card").val() === "") {
                    addError(false, "credit-card");
                }
                return;
            } else if ($("#book-form input").hasClass("form-control-invalid")) {
                return;
            }
            $("#bookModal").modal("hide");
            $("#confirmationModal").modal("toggle");
        });

    $("#name").change(function () {
        if ($(this).val()) {
            removeError(false, "name");
        } else {
            addError(false, "name");
        }
    });

    $("#datepicker").change(function () {
        if ($(this).val()) {
            removeError(false, "datepicker");
        } else {
            addError(false, "datepicker");
        }
    })

    $(".phone").change(function () {
        let reg = /^\(\d{3}\)-\d{3}-\d{4}$/
        if (!reg.test($(this).val())) {
            addError(true, "phone");
        } else {
            removeError(true, "phone");
        }
    })

    $(".email").change(function () {
        let reg = /^.+@.+\..+$/
        if (!reg.test($(this).val())) {
            addError(true, "email");
        } else {
            removeError(true, "email");
        }
    })

    $("#credit-card").change(function () {
        let reg = /^\d{4} \d{4} \d{4} \d{4}$/
        if (!reg.test($(this).val())) {
            addError(false, "credit-card");
        } else {
            removeError(false, "credit-card");
        }
    })

    $("#credit-card-info").tooltip().hover(function () {
        $(this).removeClass("bi-question-circle");
        $(this).addClass("bi-question-circle-fill");
    }, function () {
        $(this).removeClass("bi-question-circle-fill");
        $(this).addClass("bi-question-circle");
    });

    function addError(isClass, name) {
        let sel;
        if (isClass) {
            sel = `#book-form .${name}`;
        } else {
            sel = `#book-form #${name}`;
        }
        $(sel).addClass("form-control-invalid");
        $(`#${name}-invalid`).show();
    }

    function removeError(isClass, name) {
        let sel;
        if (isClass) {
            sel = `#book-form .${name}`;
        } else {
            sel = `#book-form #${name}`;
        }
        $(sel).removeClass("form-control-invalid");
        $(`#${name}-invalid`).hide();
    }

    function removeInvalidFeedback() {
        $("#book-form .invalid-feedback").hide();
        $("#book-form input").removeClass("form-control-invalid");
        $("#book-form-error").hide();
    }
});

const workingOnDays = {
    "Rinary": [1, 3, 5],
    "Animal": [1, 4, 6],
    "Doe": [2, 3, 4],
    "Smith": [2, 6],
};

const appointmentTimes = {
    0: [],
    1: ["8:00am", "5:00pm"],
    2: ["8:00am", "5:00pm"],
    3: ["8:00am", "5:00pm"],
    4: ["8:00am", "5:00pm"],
    5: ["9:00am", "4:30pm"],
    6: ["9:30am", "4:00pm"],
}