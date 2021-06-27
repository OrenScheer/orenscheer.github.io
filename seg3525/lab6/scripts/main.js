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
    });

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
        $("#confirmation-email").text(`We have sent a confirmation email to ${$("#email").val()}.`);
    });

    $("#book-form").change(function () {
        if ($("#book-form input").hasClass("form-control-invalid")) {
            $("#book-form-error").show().text("You have errors. Please correct them before submitting.");
            $("#book-form-submit").prop("disabled", true);
        } else {
            $("#book-form-error").hide();
            $("#book-form-submit").prop("disabled", false);
        }
    })
        .submit(function () {
            if ($("#book-form input").hasClass("form-control-invalid")) {
                return;
            }
            $("#bookModal").modal("hide");
            $("#confirmationModal").modal("toggle");
        });

    $(".phone").change(function () {
        let reg = /^\(\d{3}\)-\d{3}-\d{4}$/
        if (!reg.test($(this).val())) {
            $(this).addClass("form-control-invalid");
            $("#phone-invalid").show();
        } else {
            $(this).removeClass("form-control-invalid");
            $("#phone-invalid").hide();
        }
    })

    function removeInvalidFeedback() {
        $("#book-form .invalid-feedback").hide();
        $("#book-form input").removeClass("form-control-invalid");
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