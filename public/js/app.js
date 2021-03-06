

//wire up on click btn for scrape
$("#scrape-btn").on("click", function (event) {
    event.preventDefault();
    $.get("/scrape", function (data) {
        location.reload()
    })
})
//wire up on click button for save.
$(".save-btn").on("click", function (event) {
    event.preventDefault();
    var saved = {
        _id: $(this).data("value"),
        isSaved: true
    }
    //call the put method using ajax when save button is clicked
    $.ajax({
        method: "PUT",
        url: "/api/save",
        data: saved
    }).then(function (data) {
        location.reload();
    });
})

//wire up on click btn for delete.
$(".delete-btn").on("click", function (event) {
    event.preventDefault();
    var articleId = {
        _id: $(this).data("value"),
    }
    //use the POST method to call the database when delete button is clicked
    $.ajax({
        method: "POST",
        url: "/api/delete",
        data: articleId
    }).then(function (data) {
        location.reload();
    });
})

//wire up button the add note modal:
$(".modal-btn").on("click", function (event) {
    //route to call note associated with article
    event.preventDefault();
    var articleId = $(this).data("value")
    //use the GET method to display article in modal
    $.ajax({
        method: "GET",
        url: "/articles/" + articleId
    }).then(function (data) {
        var note = ""
        //create the message here
        if (data.note) {
            for (var i = 0; i < data.note.length; i++) {
                note += `<li class="list-group-item">${data.note[i].body}
                <button data-id=${data.note[i]._id} class="btn btn-danger note-delete">x</button>
                </li>`
            }
        }
        var message = `<ul class="list-group">${note}</ul>`
    
        //uses bootbox to display saved articles
        var dialog = bootbox.prompt({
            size: "small",
            title: "What is your name?",
            message: message,
            buttons: {
                confirm: {
                    label: 'Save Note',
                    className: 'btn-primary add-note-btn',
                    callback: function () {
                    }
                }
            },
            callback: function (result) {
                /* result = String containing user input if OK clicked or null if Cancel clicked */
                // Run a POST request to change the note, using what's entered in the inputs
                if (result) {
                    var note = {
                        body: result,
                    }
                    $.ajax({
                        method: "POST",
                        url: "/articles/" + articleId,
                        data: note
                    })
                        // With that done
                        .then(function (data) {
                            // Log the response
                            location.reload()
                        });
                }else{
                    console.log(`Nothing entered`)
                }
            }
        });

    })
});

//wire up button for deleting note:
$(document).on("click", ".note-delete", function() {
    // event.preventDefault()
    var noteId = {
        _id: $(this).data("id"),
    }
    //use POST method to call delete url
    $.ajax({
        method: "POST",
        url: "/note/delete",
        data: noteId
    }).then(function (data) {
    });
})

//wire up on click btn for clearing articles.
$("#clear-btn").on("click", function(event){
    event.preventDefault()
    //use get method to call delete-all url
    $.ajax({
        method: "GET",
        url: "/delete-all"
    }).then(function(data){
        location.reload()
    })
})