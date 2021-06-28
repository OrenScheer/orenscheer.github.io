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
        addError("timepicker")
    }).on("timeRangeError", function () {
        addError("timepicker");
    }).on("changeTime", function () {
        removeError("timepicker");
    }).change(function () {
        if ($(this).val()) {
            removeError("timepicker");
        } else {
            addError("timepicker");
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

    $("#book-form").change(function () {
        if ($("#book-form input").hasClass("form-control-invalid")) {
            $("#book-form-error").show().text("You have errors. Please correct them before submitting.");
        } else {
            $("#book-form-error").hide();
        }
    })
        .submit(function () {
            if ($("#book-form .required-simple").toArray().some(elem => !elem.value)) {
                $("#book-form-error").show().text("You have errors. Please correct them before submitting.");
                if (!$("#book-form #name").val()) {
                    addError("name");
                }
                if (!$("#book-form #datepicker").val()) {
                    addError("datepicker");
                }
                if (!$("#book-form #timepicker").val()) {
                    addError("timepicker");
                }
                if (!$("#book-form #email").val()) {
                    addError("email");
                }
                if (!$("#book-form #phone").val()) {
                    addError("phone");
                }
                if (!$("#book-form #credit-card").val()) {
                    addError("credit-card");
                }
                return;
            } else if ($("#book-form input").hasClass("form-control-invalid")) {
                return;
            }
            $("#confirmationModalLabel").text(`Thanks for booking, ${$("#name").val().split(" ")[0]}!`);
            $("#confirmation-text").text(`Your appointment has been booked for ${$("#datepicker").val()} at ${$("#timepicker").val()}.`);
            $("#confirmation-email").text(`We have sent a confirmation email to ${$("#book-form #email").val()}.`);
            $("#bookModal").modal("hide");
            $("#confirmationModal").modal("toggle");
        });

    $("#contact-form").change(function () {
        $("#contact-form-submitted").hide();
        if ($("#contact-form input").hasClass("form-control-invalid")) {
            $("#contact-form-error").show().text("You have errors. Please correct them before submitting.");
        } else {
            $("#book-form-error").hide();
        }
    })
        .submit(function () {
            if ($("#contact-form .required-simple").toArray().some(elem => !elem.value)) {
                $("#contact-form-error").show().text("You have errors. Please correct them before submitting.");
                if (!$("#contact-form #contact-email").val()) {
                    addError("contact-email");
                }
                if (!$("#contact-form #question").val()) {
                    addError("question");
                }
                if (!$("#contact-form #contact-phone").val()) {
                    addError("contact-phone");
                }
                if (!$("#contact-form #contact-name").val()) {
                    addError("contact-name");
                }
                return;
            } else if ($("#contact-form input").hasClass("form-control-invalid")) {
                return;
            }
            $("#contact-form").trigger("reset");
            $("#contact-form-error").hide();
            $("#contact-form-submitted").show().text("Thanks for getting in touch! We will respond shortly.");
        });

    $("#name").change(function () {
        if ($(this).val()) {
            removeError("name");
        } else {
            addError("name");
        }
    });

    $("#contact-name").change(function () {
        if ($(this).val()) {
            removeError("contact-name");
        } else {
            addError("contact-name");
        }
    });


    $("#datepicker").change(function () {
        if ($(this).val()) {
            removeError("datepicker");
        } else {
            addError("datepicker");
        }
    })

    $("#question").change(function () {
        if ($(this).val()) {
            removeError("question");
        } else {
            addError("question");
        }
    })

    $("#phone").change(function () {
        let reg = /^\(\d{3}\)-\d{3}-\d{4}$/
        if (!reg.test($(this).val())) {
            addError("phone");
        } else {
            removeError("phone");
        }
    })

    $("#contact-phone").change(function () {
        let reg = /^\(\d{3}\)-\d{3}-\d{4}$/
        if (!reg.test($(this).val())) {
            addError("contact-phone");
        } else {
            removeError("contact-phone");
        }
    })

    $("#email").change(function () {
        let reg = /^.+@.+\..+$/
        if (!reg.test($(this).val())) {
            addError("email");
        } else {
            removeError("email");
        }
    })

    $("#contact-email").change(function () {
        let reg = /^.+@.+\..+$/
        if (!reg.test($(this).val())) {
            addError("contact-email");
        } else {
            removeError("contact-email");
        }
    })

    $("#credit-card").change(function () {
        let reg = /^\d{4} \d{4} \d{4} \d{4}$/
        if (!reg.test($(this).val())) {
            addError("credit-card");
        } else {
            removeError("credit-card");
        }
    })

    $("#credit-card-info").tooltip().hover(function () {
        $(this).removeClass("bi-question-circle");
        $(this).addClass("bi-question-circle-fill");
    }, function () {
        $(this).removeClass("bi-question-circle-fill");
        $(this).addClass("bi-question-circle");
    });

    $("#datepicker-info").tooltip().hover(function () {
        $(this).removeClass("bi-question-circle");
        $(this).addClass("bi-question-circle-fill");
    }, function () {
        $(this).removeClass("bi-question-circle-fill");
        $(this).addClass("bi-question-circle");
    });

    $("#mini-logo").css("visibility", "hidden");

    function addError(id) {
        $(`#${id}`).addClass("form-control-invalid");
        $(`#${id}-invalid`).show();
    }

    function removeError(id) {
        $(`#${id}`).removeClass("form-control-invalid");
        $(`#${id}-invalid`).hide();
    }

    function removeInvalidFeedback() {
        $("#book-form .invalid-feedback").hide();
        $("#book-form input").removeClass("form-control-invalid");
        $("#book-form-error").hide();
    }
}).scroll(function () {
    if ($(this).scrollTop() > $("nav").outerHeight(true)) {
        $("#mini-logo").css("visibility", "visible");
    } else if ($(this).scrollTop() <= $("nav").outerHeight(true)) {
        $("#mini-logo").css("visibility", "hidden");
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