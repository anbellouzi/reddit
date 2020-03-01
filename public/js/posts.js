$(document).ready(function() {
    $(".comment-vote-up").submit(function(e) {
      e.preventDefault();
      var commentId = $(this).data("id");


      // alert(commentId)
      // console.log(commentId)
        
      $.ajax({
        type: "PUT",
        url: "comment/" + commentId + "/vote-up",
        success: function(data) {
          console.log("voted up!");
        },
        error: function(err) {
          console.log(err.messsage);
        }
      });
    });

    $(".comment-vote-down").submit(function(e) {
      e.preventDefault();
      alert("vote down")
      var commentId = $(this).data("id");
      $.ajax({
        type: "PUT",
        url: "comment/" + commentId + "/vote-down",
        success: function(data) {
          console.log("voted down!");
        },
        error: function(err) {
          console.log(err.messsage);
        }
      });
    });


    $(".vote-up").submit(function(e) {
      e.preventDefault();
  
      var postId = $(this).data("id");
      $.ajax({
        type: "PUT",
        url: "posts/" + postId + "/vote-up",
        success: function(data) {
          console.log("voted up!");
        },
        error: function(err) {
          console.log(err.messsage);
        }
      });
    });
  
    $(".vote-down").submit(function(e) {
      e.preventDefault();
  
      var postId = $(this).data("id");
      $.ajax({
        type: "PUT",
        url: "posts/" + postId + "/vote-down",
        success: function(data) {
          console.log("voted down!");
        },
        error: function(err) {
          console.log(err.messsage);
        }
      });
    });
  });