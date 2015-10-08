<?php

//GET route
$app->get('/api/eventos', function () use ($app) {
   $arr = array();
   $arr["user"] = "Juan";
   
   echo json_encode($arr);
});

$app->get('/api/eventos/:id', function ($id) use ($app) {
   $arr = array();
   $arr["user"] = $id;
   
   echo json_encode($arr);
});

//POST route

$app->get('/api/eventos/:id', function () use ($app) {
   $arr = array();
   $arr["user"] = "Juan";
   
   echo json_encode($arr);
});

//PUT route
$app->post('/api/eventos', function () use ($app) {
   $post = (object)$app->request()->post();
   $arr = array();
   $arr["user"] = $post->id;
   
   echo json_encode($arr);
});

//DELETE route

//OPTIONS route

//PATCH route

?>
