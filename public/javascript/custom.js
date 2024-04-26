// ======================================register=======================================

$("#registerForm").validate({
  rules: {
    fname: {
      required: true,
      minlength: 2,
    },
    lname: {
      required: true,
      minlength: 2,
    },
    email: {
      required: true,
      email: true,
    },
    password: {
      required: true,
      minlength: 2,
    },
  },
  messages: {
    fname: {
      required: "Please enter first name",
      minlength: "First name should be minimum 2 character long.",
    },
    lname: {
      required: "Please enter last name",
      minlength: "Last name should be minimum 2 character long.",
    },
    email: {
      required: "Please provide an email address.",
      email: "Please enter a valid email address.",
    },
    password: {
      required: "Password is required!",
      minlength: "Your password must be at least 2 characters long",
    },
  },
  errorPlacement: function (error, element) {
    error.addClass("text-danger"), error.insertAfter(element);
  },

  submitHandler: function (form) {
    form.submit();
  },
});

$("#registerBtn").on("click", function (e) {
  e.preventDefault();
  $this = $("#registerForm");
  if ($this.valid()) {
    let registerdata = {
      fname: $('input[name="fname"]').val().trim(),
      lname: $('input[name="lname"]').val().trim(),
      email: $('input[name="email"]').val().trim(),
      password: $('input[name="password"]').val().trim(),
    };
    $.ajax({
      url: "/api/auth/register",
      contentType: "application/json",
      method: "POST",
      data: JSON.stringify(registerdata),
      success: function (response) {
        console.log(response);
        window.location.href = "/login";
      },
      error: function (xhr) {
        console.error(xhr.responseText);
      },
    });
    $($this).each(function () {
      this.reset();
    });
  } else {
    console.log("not valid");
  }
});

// ================================ Login Form Validation Here ===================== //

$("#loginForm").validate({
  rules: {
    email: {
      required: true,
      email: true,
    },
    password: {
      required: true,
      minlength: 2,
    },
  },
  messages: {
    email: {
      required: "Please provide an email address.",
      email: "Please enter a valid email address.",
    },
    password: {
      required: "Password is required!",
      minlength: "Password must be at least 2 characters",
    },
  },

  errorPlacement: function (error, element) {
    error.addClass("text-danger");
    error.insertAfter(element);
  },

  submitHandler: function (form) {
    form.submit();
  },
});

$("#logInBtn").on("click", function (e) {
  e.preventDefault();
  $this = $("#loginForm");
  if ($this.valid()) {
    let logindata = {
      email: $('input[name="email"]').val().trim(),
      password: $('input[name="password"]').val().trim(),
    };
    $.ajax({
      url: "/api/auth/login",
      contentType: "application/json",
      method: "POST",
      data: JSON.stringify(logindata),
      success: function (response) {
        console.log(response);
        window.location.href = "/";
      },
      error: function (xhr) {
        console.error(xhr.responseText);
      },
    });
    $($this).each(function () {
      this.reset();
    });
  } else {
    console.log("not valid");
  }
});

$(document).on("click", "#logoutbtn", function (e) {
  e.preventDefault();
  window.location.href = "/api/auth/logout";
  window.location.reload();
});

// =====================================DataTable================================

let userDataTable;
function loadDataTable() {
  if ($("#DataTable").length) {
    userDataTable = $("#DataTable").DataTable({
      lengthMenu: [
        [10, 25, 50, -1],
        [10, 25, 50, "All"],
      ],
      iDisplayLength: 10,
      bDestroy: true,
      dom: "lfrtip",
      autoWidth: false,
      scrollX: true,
      processing: true,
      bSort: false,
      serverSide: true,
      loadingRecords: "&nbsp;",
      language: {
        loadingRecords: "&nbsp;",
        paginate: {
          previous: '<i class="fas fa-chevron-left fs-6"></i>',
          next: '<i class="fas fa-chevron-right fs-6"></i>',
        },
      },
      serverMethod: "POST",

      ajax: {
        url: "/api/auth/datafind",
      },
      columns: [
        {
          data: "",
          defaultContent: "-",
        },
        {
          data: null,
          defaultContent: "-",
          render: function (data) {
            return data.fname;
          },
        },
        {
          data: null,
          defaultContent: "-",
          render: function (data) {
            return data.lname;
          },
        },
        {
          data: null,
          defaultContent: "-",
          render: function (data) {
            return data.email;
          },
        },
        {
          data: null,
          defaultContent: "-",
          render: function (data) {
            return data.password;
          },
        },
        {
          data: null,
          defaultContent: "-",
          render: function (data) {
            return `<div class=' text-center'> 
                <button type="button" class="base_btn btn btn-sm mw-100 p-0  btn-outline-success bg-dark" id="updateData" title="Update Data" data-myval="${data._id}"><i class="fa-solid fa-pen-to-square fs-4 p-1 mx-2"></i></button>
                <button type="button" class="base_btn btn btn-sm mw-100 p-0 btn-outline-danger" id="deleteData" title="Delete Data" data-myval="${data._id}"><i class="fas fa-trash fs-4 p-1 mx-2"></i></button>
              </div>`;
          },
        },
      ],
      fnRowCallback: function (nRow, aData, iDisplayIndex) {
        let oSettings = userDataTable.settings()[0];
        $("td:first", nRow).html(oSettings._iDisplayStart + iDisplayIndex + 1);
        nRow.id = aData._id;
        return nRow;
      },
    });
  }
}
loadDataTable();

// =================================Data-model-show ==================================

$("table").on("click", "#updateData", function (e) {
  e.preventDefault();
  let dataId = $(this).data("myval");
  let rowElement = $(this)
    .closest("tbody")
    .find("tr")
    .index($("#" + dataId));
  let UserData = userDataTable.row(rowElement).data();
  let getfname = UserData["fname"];
  document.getElementById("editfname").value = getfname;
  let getlname = UserData["lname"];
  document.getElementById("editlname").value = getlname;
  let getemail = UserData["email"];
  document.getElementById("editemail").value = getemail;
  let getpassword = UserData["password"];
  document.getElementById("editpassword").value = getpassword;

  $("#Data_id").val(dataId);

  $("#DataUpdate").modal("show");
});

// =================================Data-Update ======================================

$(document).on("submit", "#Dataform", function (e) {
  e.preventDefault();
  let dataId = $("#Data_id").val();
  let UserData = {};
  $("#DataUpdate input").each(function () {
    let fieldName = $(this).attr("name");
    let fieldValue = $(this).val().trim();
    UserData[fieldName] = fieldValue;
  });
  console.log(UserData);
  $.ajax({
    url: "/api/auth/updatedata/" + dataId,
    contentType: "application/json",
    method: "PUT",
    data: JSON.stringify(UserData),
    success: function (response) {
      console.log("Data updated successfully:", response);
      $("#DataTable").DataTable().ajax.reload();
    },
    error: function (error) {
      console.log("Error updating data:", error);
    },
  });
  $("#DataUpdate").modal("toggle");
  return false;
});

// =================================Data-delete======================================

$("table").on("click", "#deleteData", function (e) {
  e.preventDefault();
  if (confirm("Are you sure you want to delete this data?")) {
    let dataId = $(this).data("myval");
    $.ajax({
      url: "/api/auth/deletedata/" + dataId,
      method: "DELETE",
      success: function (response) {
        console.log("Data deleted successfully:", response);
        $("#DataTable").DataTable().ajax.reload();
      },
      error: function (error) {
        console.log("Error deleting data:", error);
        alert("Error deleting data. Please try again.");
      },
    });
  }
});
