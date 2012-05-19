$(document).ready ->
  $('[data_behavior="select_album"]').change (e) ->
    $.get '/admin/albums/' + this.value + '/select_album'