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
    });
    // let data = $this.serializeArray();
    // console.log(data);
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
    });
    // let data = $this.serialize();
    // console.log(data);
    $($this).each(function () {
      this.reset();
    });
  } else {
    console.log("not valid");
  }
});

let dataTable;
function loadDataTable() {
  if ($("#DataTable").length) {
    dataTable = $("#DataTable").DataTable({
      lengthMenu: [
        [10, 25, 50, -1],
        [10, 25, 50, "All"],
      ],
      iDisplayLength: 10,
      bDestroy: true,
      dom: "lfrtip",
      autoWidth: false,
      scrollX: true,
      // processing: true,
      bSort: false,
      serverSide: true,
      loadingRecords: "&nbsp;",
      language: {
        loadingRecords: "&nbsp;",
        paginate: {
          previous: '<i class="fas fa-chevron-left fs-6 text-info"></i>',
          next: '<i class="fas fa-chevron-right fs-6 text-info"></i>',
        },
      },
      serverMethod: "POST",

      ajax: {
        url: "/api/datatable/datafind",
      },
      columns: [{
        data:"",
        defaultContent: "-"
      },
      {
        data: null,
					defaultContent: "-",
					render: function (data) {
						return data.fname;
					}
      },
      {
        data: null,
					defaultContent: "-",
					render: function (data) {
						return data.lname;
					}
      },
      {
        data: null,
					defaultContent: "-",
					render: function (data) {
						return data.email;
					}
      },
      {
        data: null,
					defaultContent: "-",
					render: function (data) {
						return data.email;
					}
      },
      {
        data: null,
        defaultContent: "-",
        render: function (data) {
          return `<div class=' text-center'> 
                <button type="button" class="base_btn btn btn-sm mw-100 p-0  btn-outline-success bg-dark" id="updateBlog" title="Update Blog" data-myval="${data._id}"><i class="fa-solid fa-pen-to-square fs-4 p-1 mx-2"></i></button>
                <button type="button" class="base_btn btn btn-sm mw-100 p-0 btn-outline-danger" id="deleteBlog" title="Delete Blog" data-myval="${data._id}"><i class="fas fa-trash fs-4 p-1 mx-2"></i></button>
              </div>`;
        }
      }
    ],
    fnRowCallback: function (nRow, aData, iDisplayIndex) {
      let oSettings = dataTable.settings()[0];
      $("td:first", nRow).html(oSettings._iDisplayStart + iDisplayIndex + 1);
      nRow.id = aData._id;
      return nRow;
    }
    });
  }
}
loadDataTable();
