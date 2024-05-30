$(document).ready(function () {
  // toggle mobile menu
  $('[data-toggle="toggle-nav"]').on("click", function () {
    $(this)
      .closest("nav")
      .find($(this).attr("data-target"))
      .toggleClass("hidden");
    return false;
  });

  // feather icons
  feather.replace();

  // smooth scroll
  var scroll = new SmoothScroll('a[href*="#"]');

  // tiny slider
  $("#slider-1").slick({
    infinite: true,
    centerMode: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: $(".prev"),
    nextArrow: $(".next"),
  });

  $("#slider-2").slick({
    dots: true,
    arrows: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    centerMode: true,
    customPaging: function (slider, i) {
      return (
        '<div class="bg-white br-round w-1 h-1 opacity-50 mt-5" id=' +
        i +
        "> </div>"
      );
    },
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  });
});

window.submitDone = false;

// https://stackoverflow.com/a/72548850
async function submitInquiry() {
  if (window.submitDone) return;
  const submitBtn = document.getElementById("inq-submit");
  var inqType = document.getElementById("inq-type");
  const inquiryType = encodeURIComponent(
    inqType.options[inqType.selectedIndex].text
  );
  const name = encodeURIComponent(document.getElementById("inq-name").value);
  const emailAddress = encodeURIComponent(
    document.getElementById("inq-email").value
  );
  const subject = encodeURIComponent(
    document.getElementById("inq-subject").value
  );
  const message = encodeURIComponent(
    document.getElementById("inq-message").value
  );

  // https://developers.google.com/recaptcha/docs/v3#programmatically_invoke_the_challenge
  grecaptcha.ready(() => {
    grecaptcha
      .execute("6LdziewpAAAAALrXadLzdHEOeTs0WyJl2RTDvI16", { action: "submit" })
      .then((token) => {
        // https://docs.google.com/forms/d/e/1FAIpQLScu-oR4z-ukc8JV3N5oI6BAoKzieSbNIoeDmpCCsnHxDA7k1Q/viewform?usp=pp_url&entry.1345155859=Lunar&entry.641165534=name&entry.1831416741=email&entry.2057905555=subject&entry.1966887127=message
        const submitURL = `https://docs.google.com/forms/d/e/1FAIpQLScu-oR4z-ukc8JV3N5oI6BAoKzieSbNIoeDmpCCsnHxDA7k1Q/formResponse?&submit=Submit?usp=pp_url&entry.1345155859=${inquiryType}&entry.641165534=${name}&entry.1831416741=${emailAddress}&entry.2057905555=${subject}&entry.1966887127=${message}`;
        fetch(submitURL)
          .then((resp) => {
            console.log(resp);
          })
          .catch((err) => {
            if (err.toString().includes("TypeError: Failed to fetch")) {
              console.log("success");
              submitBtn.classList.remove("bg-indigo");
              submitBtn.classList.add("bg-green");
              submitBtn.innerHTML =
                "✔ We've received your message and will get back to you soon!";
              window.submitDone = true;
            }
          });
      });
  });
}
