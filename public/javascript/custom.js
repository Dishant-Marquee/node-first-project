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
        toastr.success("Register Successfully.");
        console.log(response);
        window.location.href = "/login";
      },
      error: function (xhr) {
        toastr.error(xhr.responseJSON.error);
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
      email: $('#inputEmail4').val().trim(),
      password: $('#inputPassword4').val().trim(),
    };
    $.ajax({
      url: "/api/auth/login",
      contentType: "application/json",
      method: "POST",
      data: JSON.stringify(logindata),
      success: function (response) {
        toastr.success("Log-in Successfully.");
        console.log(response);
        window.location.href = "/";
      },
      error: function (xhr) {
        toastr.error("Log-in Faild");
        console.error(xhr.responseText);
      },
    });
    $($this).each(function () {
      this.reset();
    });
  } else {
    toastr.error("please enter valid details");
    console.log("not valid");
  }
});

$(document).on("click", "#logoutbtn", function (e) {
  e.preventDefault();
  
  $.ajax({
      url: "/api/auth/logout",
      type: "GET",
      success: function(response) {
          window.location.href = "/";
      },
      error: function(xhr, status, error) {
          console.error("Logout failed:", error);
      }
  });
});

// =====================================DataTable================================

let userDataTable;

function loadDataTable() {
  if ($("#User_Table").length > 0) {
    userDataTable = $("#User_Table").DataTable({
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
      language: {
        loadingRecords: "&nbsp;",
        paginate: {
          previous: '<i class="fas fa-chevron-left fs-6 text-info"></i>',
          next: '<i class="fas fa-chevron-right fs-6 text-info"></i>',
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
      toastr.success("Data updated successfully.");
      console.log("Data updated successfully:", response);
      $("#User_Table").DataTable().ajax.reload();
    },
    error: function (error) {
      toastr.error("Error updating data");
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
        toastr.success("Data deleted successfully.");
        console.log("Data deleted successfully:", response);
        $("#User_Table").DataTable().ajax.reload();
      },
      error: function (error) {
        toastr.error(xhr.responseJSON.message);
        console.log("Error deleting data:", error);
        alert("Error deleting data. Please try again.");
      },
    });
  }
});



// ===================================forgot-password-modal-open======================================

$(document).on("click", "#frdpass", function (e) {
  e.preventDefault();

  $("#pwdModal").modal("show");
});

//====================================forgot-password======================================

$(document).on("submit", "#forgotform", function (e) {
  e.preventDefault();

  const email = $("#emailInput").val();

  const userData = { email: email };

  $.ajax({
    url: "/api/auth/forgotpassword/",
    contentType: "application/json",
    method: "POST",
    data: JSON.stringify(userData),
    success: function (response) {
      if (response.success) {
        console.log(response);
        $("#otpFillModal").modal("toggle");
        console.log("Password reset OTP sent successfully!");
      } else {
        console.log("User not found. Please try again.");
      }
    },
    error: function (error) {
      console.log(error.responseText);
      alert("Error sending password reset OTP. Please try again.");
    },
    
  });
  
  $("#pwdModal").modal("hide");

  return false;
});

// ===================================otp-fill-form=============================


const Inputs = document.getElementById("otpInputs");

    if (Inputs) {
      Inputs.addEventListener("input", function (e) {
        const target = e.target;
        const val = target.value;

        if (isNaN(val)) {
          target.value = "";
          return;
        }

        if (val !== "") {
          const next = target.nextElementSibling;
          if (next) {
            next.focus();
          }
        }
      });

      Inputs.addEventListener("keyup", function (e) {
        const target = e.target;
        const key = e.key.toLowerCase();

        if (key === "backspace" || key === "delete") {
          target.value = "";
          const prev = target.previousElementSibling;
          if (prev) {
            prev.focus();
          }
        }
      });
    } else {
      console.error("Element with ID 'otpInputs' not found.");
    }



//=============================otp-val-merge-verify======================


$(document).on("submit", "#otpForm", function (e) {
  e.preventDefault();

    const otpInputs = document.querySelectorAll('.otp-input');
    let otp = '';

    otpInputs.forEach(input => {
      otp += input.value;
    });

    console.log('Concatenated OTP:', otp);

    if (otp.length !== 6) {
      console.error('OTP is not complete.');
      return;
    }

    const email = $("#emailInput").val();

    $.ajax({
      url: "/api/auth/verifyotp",
      contentType: "application/json",
      method: "POST",
      data: JSON.stringify({email: email,  otp: otp }),
      success: function(response) {
        if (response.success) {
          console.log(response);
          $('#crtnewpass').modal('show');
          console.log("password reset OTP sent successfully!");
        } else {
          console.log("User not found. Please try again.");
        }
      },
    
    error: function (error) {
      console.log(error.responseText);
      alert("Error sending password reset OTP. Please try again.");
    }
  });

    $("#otpFillModal").modal("hide");

    return false;
  });



  //=======================resend-password======================

  $(document).on("click", "#resendotp", function (e) {
    e.preventDefault();

    const email = $("#emailInput").val();

  const userData = { email: email }; 

    $.ajax({
      url: "/api/auth/resendotp/",
      contentType: "application/json",
      method: "POST",
      data: JSON.stringify(userData),
      success: function(response) {
        console.log(response.message);
        console.log('otp is done');
      },
      error: function(error) {
        console.error('Error resending OTP:', error);
        alert('Failed to resend OTP.');
      }
    });
  });
  

  //=====================create-new-password======================

//   $(document).on("submit",'#createnewpassword',function(e) {
//     e.preventDefault(); // Prevent the form from submitting

//     const newPassword = document.getElementById('newpass').value;
//     const confirmPassword = document.getElementById('confirmpass').value;
//     const errorMessage = document.getElementById('error-message');
//     // const email = $("#EEmailInput").val();

//     if (newPassword !== confirmPassword) {
//         errorMessage.textContent = 'Passwords do not match!';
//     } else {
//         errorMessage.textContent = '';

//         // Submit the form via AJAX or however you need
//         $.ajax({
//             type: "POST",
//             url: "/api/auth/resetpassword",
//             data: JSON.stringify({ email: email, newPassword: newPassword }),
//             contentType: "application/json",
//             success: function(response) {
//                 alert('Password reset successfully!');
//                 $('#crtnewpass').modal('hide');
//             },
//             error: function(error) {
//                 alert('Error resetting password. Please try again.');
//             }
//         });
//     }
// });

//================================or====================================

let userEmail = '';

$(document).on("submit", "#forgotform", function(e) {
    e.preventDefault(); 
    userEmail = document.getElementById('emailInput').value;
    console.log("Captured email:", userEmail);
});

$(document).on("submit", "#createnewpassword", function(e) {
    e.preventDefault(); 

    const newPassword = document.getElementById('newpass').value;
    const confirmPassword = document.getElementById('confirmpass').value;
    const errorMessage = document.getElementById('error-message');

    if (newPassword !== confirmPassword) {
        errorMessage.textContent = 'Passwords do not match!';
    } else {
        errorMessage.textContent = '';

        $.ajax({
          url: "/api/auth/resetpassword",
          contentType: "application/json",
          method: "POST",
          data: JSON.stringify({ email: userEmail, newPassword: newPassword }),
            success: function(response) {
                toastr.success('Password reset successfully!');
                console.log('password reset successfuly')
                $('#crtnewpass').modal('hide');
            },
            error: function(error) {
                toastr.error('Error resetting password. Please try again.');
            }
        });
    }
});

