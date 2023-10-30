$(document).ready(function () {
  // Init
  $(".image-section").hide();
  $(".loader").hide();
  $("#result").hide();
  mood = NaN;
  // Upload Preview
  function readURL(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = function (e) {
        $("#imagePreview").css(
          "background-image",
          "url(" + e.target.result + ")"
        );
        $("#imagePreview").hide();
        $("#imagePreview").fadeIn(650);
      };
      reader.readAsDataURL(input.files[0]);
    }
  }
  $("#imageUpload").change(function () {
    $(".image-section").show();
    $("#btn-predict").show();
    $("#result").text("");
    $("#result").hide();
    readURL(this);
  });

  // Predict
  $("#btn-predict").click(function () {
    var form_data = new FormData($("#upload-file")[0]);

    // Show loading animation
    $(this).hide();
    $("#first_loader").show();

    // Make prediction by calling api /predict
    $.ajax({
      type: "POST",
      url: "/predict",
      data: form_data,
      contentType: false,
      cache: false,
      processData: false,
      async: true,
      success: function (data) {
        // Get and display the result
        $("#first_loader").hide();
        $("#result").fadeIn(600);
        $("#result").text("Mood Detected:  " + data);
        mood = data;
        console.log("Success!");
        console.log(mood);
        $("#bro").show();
      },
    });
    console.log(mood);
    if (mood != "Happy") {
      // Recommend
      $("#btn-recommend").click(function () {
        $("#second_loader").show();

        $.ajax({
          type: "POST",
          url: "/recommend",
          data: mood,
          contentType: false,
          cache: false,
          processData: false,
          async: true,
          success: function (data) {
            $("#second_loader").hide();
            $("#result2").fadeIn(600);
            $("#result2").text("Recommendation: " + data);
            console.log("Success!");
          },
        });
      });
    }
  });
});
