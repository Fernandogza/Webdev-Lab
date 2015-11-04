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

    $app->response->headers->set("Access-Control-Allow-Origin","*");
    $app->response->headers->set("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");

    echo json_encode($arr);
    http_response_code(200);
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

//RSVP
//Get all RSVPs from a specific event
$app->get('/api/event/:id/blog/', function ($id) use ($app) {
   $blogs = R::find('blog', 'id_event = ?', array($id));
    $arr = array(
        'data' => R::exportAll($blogs)
    );
    
    delFromArray($arr, array('id_event'));

    echo json_encode($arr);
});

//POST route (Update)

//Edit User
$app->post('/api/user/:id', function ($id) use ($app) {
   $post = (object)$app->request()->post();
   $user = R::load("user", $id);
        $user->username = $post->username;
        $user->password = md5($post->password);
        $user->name     = $post->name;
    R::store($user);
});

//Edit Event
$app->post('/api/event/:id', function ($id) use ($app) {
   $post = (object)$app->request()->post();
   $event = R::load("event", $id);
        $event->idAdmin = $post->idAdmin;
        $event->place = $post->place;
        $event->name = $post->name;
        $event->date = $post->date;
        $event->description = $post->description;
    R::store($event);
});

//Edit Schedule
$app->post('/api/schedule/:id', function ($id) use ($app) {
   $post = (object)$app->request()->post();
   $schedule = R::load("schedule", $id);
        $schedule->idEvent = $post->idEvent;
        $schedule->startDate = $post->startDate;
        $schedule->endDate = $post->endDate;
        $schedule->name = $post->name;
        $schedule->description = $post->description;
    R::store($schedule);
});

//Edit RSVP
$app->post('/api/rsvp/:id', function ($id) use ($app) {
   $post = (object)$app->request()->post();
   $rsvp = R::load("rsvp", $id);
        $rsvp->idEvent = $post->idEvent;
        $rsvp->idUser = $post->idUser;
        $rsvp->status = $post->status;
    R::store($rsvp);
});

//Edit BLOG
$app->post('/api/blog/:id', function ($id) use ($app) {
   $post = (object)$app->request()->post();
   $blog = R::load("blog", $id);
        $blog->idEvent = $post->idEvent;
        $blog->idUser = $post->idUser;
        $blog->text = $post->text;
    R::store($blog);
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
   $event = R::dispense("event");
        $event->idAdmin = $post->idAdmin;
        $event->place = $post->place;
        $event->name = $post->name;
        $event->date = $post->date;
        $event->description = $post->description;
    R::store($event);
});

//New Schedule
$app->put('/api/schedule', function () use ($app) {
   $post = (object)$app->request()->post();
   $schedule = R::dispense("schedule");
        $schedule->idEvent = $post->idEvent;
        $schedule->startDate = $post->startDate;
        $schedule->endDate = $post->endDate;
        $schedule->name = $post->name;
        $schedule->description = $post->description;
    R::store($schedule);
});

//New RSVP
$app->put('/api/rsvp', function () use ($app) {
   $post = (object)$app->request()->post();
   $rsvp = R::dispense("rsvp");
        $rsvp->idEvent = $post->idEvent;
        $rsvp->idUser = $post->idUser;
        $rsvp->status = $post->status;
    R::store($rsvp);
});

//New BLOG
$app->put('/api/blog', function () use ($app) {
   $post = (object)$app->request()->post();
   $blog = R::dispense("blog");
        $blog->idEvent = $post->idEvent;
        $blog->idUser = $post->idUser;
        $blog->text = $post->text;
    R::store($blog);
});

//DELETE route

$app->delete('/api/user/:id', function ($id) use ($app) {
   $post = (object)$app->request()->post();
   $user = R::load("user", $id);
   R::trash($user);
});

//Edit Event
$app->delete('/api/event/:id', function ($id) use ($app) {
   $post = (object)$app->request()->post();
   $event = R::load("event", $id);
    R::trash($event);
});

//Edit Schedule
$app->delete('/api/schedule/:id', function ($id) use ($app) {
   $post = (object)$app->request()->post();
   $schedule = R::load("schedule", $id);
   R::trash($schedule);
});

//Edit RSVP
$app->delete('/api/rsvp/:id', function ($id) use ($app) {
   $post = (object)$app->request()->post();
   $rsvp = R::load("rsvp", $id);
   R::trash($rsvp);
});

//Edit BLOG
$app->delete('/api/blog/:id', function ($id) use ($app) {
   $post = (object)$app->request()->post();
   $blog = R::load("blog", $id);
   R::trash($blog);
});

?>
