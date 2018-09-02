function search(url){	 
	  $("#title-results").empty();
	  $.get(url,functionPutBookInTable);
}

function create(URL, input){	 
	 $.ajax({
	        type: 'POST',
	        contentType: 'application/json',
	        url: URL,
	        dataType: "json",
	        data: input,
	        success: function(data, textStatus, jqXHR){
	            alert('Book created successfully');
	        },
	        error: function(jqXHR, textStatus, errorThrown){
	            alert('addBook error: ' + textStatus);
	        }
	    });
}

function functionPutBookInTable(response) {
    var string = '';
    $.each(response, function( index, value ) {
      string += '<tr><td>' + value.id
      + '</td><td>' + value.title
      + '</td><td>' + value.price
      + '</td><td>' +value.nbpage + '</td><td>';
      if(value.publisher != undefined){
          string +=  value.publisher.name;
      }
      string +=  '</td><td>'
      if(value.authors != undefined){
          var virgule = '';
          $.each(value.authors, function( index, valueauthors ) {
              string +=  virgule + valueauthors.name;
              virgule = ', ';
              })
      }
      string += '</td><td>'
      string += '<button type="button" onclick="deleteBook(' + value.id + ')">X</button>'
      string += '</td></tr>';
    });
    $("#title-results").append(string);
}

function deleteBook (id) {
    $.ajax({
                url: 'rest/book/' + id,
                type: 'DELETE'
        });
};


