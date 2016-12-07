$(document).on("ready", function(){

  $.ajax({
    method:'GET',
    url: 'http://api.giphy.com/v1/gifs/trending',
    dataType: 'json',
    data: $('form').serialize(),
    success: onSuccess,
    error: onError
  })

  $('form').on('submit',searchReq);
  function searchReq(event){
    event.preventDefault();
    $('img').remove();
    $.ajax({
      method: 'GET',
      url: 'http://api.giphy.com/v1/gifs/search',
      dataType: 'json',
      data: $('form').serialize(),
      success: onSuccess,
      error: onError
    })
  }

  $('.btn-success').on('click',loadMore);
  function loadMore(event){
    $.ajax({
      method: 'GET',
      url: 'http://api.giphy.com/v1/gifs/search',
      dataType: 'json',
      data: $('form').serialize()+'&offset=25',
      success: onSuccess,
      error: onError
    })
  }

  function onError(xhr,status,errorThrown){
    alert("Sorry, there was a problem!");
    console.log("Error: " + errorThrown);
    console.log("Status: " + status);
    console.dir(xhr);
  }

  function onSuccess(json){
    var dataArr = json.data;
    dataArr.forEach(function(object){
      $('.gif-gallery').append('<img src='+object.images.fixed_height.url+'>');
    })
  }

});
