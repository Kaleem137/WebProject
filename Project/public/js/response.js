$("#leftsection  ul li:nth-child(1)").on("click", function () {
  $.get("/");
});
$("#leftsection  ul li:nth-child(2)").on("click", function () {
  $.post("/profile", function (data) {
    $("#middlesection").html(data);
  });
});
$("#leftsection  ul li:nth-child(3)").on("click", function () {
  $.post("/results", function (data) {
    $("#middlesection").html(data);
  });
});
$("#leftsection  ul li:nth-child(4)").on("click", function () {
  $.post("/courses", function (data) {
    $("#middlesection").html(data);
  });
});
$("#leftsection  ul li:nth-child(5)").on("click", function () {
  $.post("/attendence", function (data) {
    $("#middlesection").html(data);
  });
});
