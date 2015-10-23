<?php

//GET route

//User
//Get all users
$app->get('/api/user/', function() use ($app){
    $users = R::find('user', 'role = "user"');
    $arr = array(
        'data' => R::exportAll($users)
    );
    
    delFromArray($arr, array('password'));

    echo json_encode($arr);
});

//Get a specific user
$app->get('/api/user/:id', function($id) use ($app){
    $users = R::load('user', $id);
    $arr = array(
        'data' => R::exportAll($users)
    );
    
    delFromArray($arr, array('password'));

    echo json_encode($arr);
});

//Event
//Get all events
$app->get('/api/event/', function () use ($app) {
   $events = R::find('event');
    $arr = array(
        'data' => R::exportAll($events)
    );
    
    delFromArray($arr, array('id_admin'));

    echo json_encode($arr);
});

//Get a specific event
$app->get('/api/event/:id', function ($id) use ($app) {
   $events = R::load('event', $id);
    $arr = array(
        'data' => R::exportAll($events)
    );
    
    delFromArray($arr, array('id_admin'));

    echo json_encode($arr);
});


//Schedule
//Get all schedules for a specific event
$app->get('/api/event/:id/schedule/', function ($id) use ($app) {
   $schedules = R::find('schedule', 'id_event = ?', array($id));
    $arr = array(
        'data' => R::exportAll($schedules)
    );
    
    delFromArray($arr, array('id_event'));

    echo json_encode($arr);
});

//Get a specific schedule
$app->get('/api/schedule/:id', function ($id) use ($app) {
   $schedules = R::load('schedule', $id);
    $arr = array(
        'data' => R::exportAll($schedules)
    );

    echo json_encode($arr);
});

//RSVP
//Get all RSVPs from a specific event
$app->get('/api/event/:id/rsvp/', function ($id) use ($app) {
   $rsvps = R::find('rsvp', 'id_event = ?', array($id));
    $arr = array(
        'data' => R::exportAll($rsvps)
    );
    
    delFromArray($arr, array('id_event'));

    echo json_encode($arr);
});

//Get the RSVP status from a specific user for a specific event
$app->get('/api/event/:id/rsvp/:userId', function ($id, $userId) use ($app) {
   $rsvps = R::find('rsvp', 'id_event = ? AND id_user = ?', array($id, $userId));
    $arr = array(
        'data' => R::exportAll($rsvps)
    );
    
    delFromArray($arr, array('id_event', 'id_user'));

    echo json_encode($arr);
});

//POST route (Update)

$app->post('/api/eventos/:id', function () use ($app) {
   $arr = array();
   $arr["user"] = "Juan";
   
   echo json_encode($arr);
});

//PUT route (Create)
//New User
$app->put('/api/user', function () use ($app) {
   $post = (object)$app->request()->post();
   $user = R::dispense("user");
        $user->username = $post->username;
        $user->password = md5($post->password);
        $user->name     = $post->name;
    R::store($user);
});

//New Event
$app->put('/api/event', function () use ($app) {
   $post = (object)$app->request()->post();
   $user = R::dispense("user");
        $user->username = $post->username;
        $user->password = md5($post->password);
        $user->name     = $post->name;
    R::store($user);
});

//DELETE route

//OPTIONS route

//PATCH route

?>
