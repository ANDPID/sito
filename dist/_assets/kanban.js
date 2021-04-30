$(document).ready(function() {
    let color = "#2196F3";
    colorBorder();
  
    // Render bottom border for input field
    function colorBorder() {
      $("input[type=text]").css("border-bottom", "2px solid");
    }
  
    // Define card
    function card(color, text) {
      return (
        `<div class="kanban-card">
              <p>` +
        text +
        `</p>
              <button>
                X
              </button>
          </div>`
      );
    }
  
    // Add new card
    $("input[type=text]").keypress(function(event) {
      if (event.which === 13) {
        let text = $(this).val();
        $(this).val("");
        $(this)
          .next(".list-body")
          .append(card(color, text));
      }
    });
  
    // Delete card
    $(document).on("click", ".kanban-card > button", function() {
      $(this)
        .parent()
        .fadeOut(250, function() {
          $(this).remove();
        });
    });
  
   
  
    $(function() {
      $("#sortable1, #sortable2, #sortable3")
        .sortable({
          connectWith: ".list-body"
        })
        .disableSelection();
    });
  });
  