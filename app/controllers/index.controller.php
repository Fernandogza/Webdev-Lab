<?php

//GET route
$app->get('/', function () use ($app) {
   $app->render('index.html.twig');
});

$app->get('/init', function () use ($app) {
    $user = R::dispense("user");
        $user->username = "admin";
        $user->password = md5("123456");
        $user->role = "admin";
        $user->name = "Admin User";
    R::store($user);
    $user = R::dispense("user");
        $user->username = "test";
        $user->password = md5("123456");
        $user->name = "Test User";
    R::store($user);
    $user = R::dispense("user");
        $user->username = "pedro";
        $user->password = md5("123456");
        $user->name = "Pedro Martinez";
    R::store($user);
    $user = R::dispense("user");
        $user->username = "luis";
        $user->password = md5("123456");
        $user->name = "Luis Robles";
    R::store($user);
    
    $event = R::dispense("event");
        $event->idAdmin = 1;
        $event->place = "Cintermex";
        $event->name = "Feria del libro";
        $event->date = strtotime("22-11-2015 11:00 PM");
        $event->description = "This is a description, it can have a lot of words!";
    R::store($event);
    $event = R::dispense("event");
        $event->idAdmin = 1;
        $event->place = "Cintermex";
        $event->name = "Expo tu Casa";
        $event->date = strtotime("30-09-2015 11:00 AM");
        $event->description = "This is a description, it can have a lot of words!";
    R::store($event);
    
    $blog = R::dispense("blog");
        $blog->text = "El evento es el mejor evento que he ido en mi vida.";
        $blog->idUser = 3;
        $blog->idEvent = 1;
    R::store($blog);
    $blog = R::dispense("blog");
        $blog->text = "Estoy ansioso para que se vuelva a hacer el evento el próximo año.";
        $blog->idUser = 4;
        $blog->idEvent = 2;
    R::store($blog);
    
    $rsvp = R::dispense("rsvp");
        $rsvp->idEvent = 1;
        $rsvp->idUser = 3;
        $rsvp->status = "going";
    R::store($rsvp);
    $rsvp = R::dispense("rsvp");
        $rsvp->idEvent = 2;
        $rsvp->idUser = 4;
        $rsvp->status = "maybe";
    R::store($rsvp);
    
    $schedule = R::dispense("schedule");
        $schedule->idEvent = 1;
        $schedule->startDate = strtotime("22-11-2015 11:30 AM");
        $schedule->endDate = strtotime("22-11-2015 12:30 PM");
        $schedule->name = "Conferencia Magistral";
        $schedule->description = "This is a description, it can have a lot of words!";
    R::store($schedule);
        
});

//POST route

//PUT route

//DELETE route

//OPTIONS route

//PATCH route

?>
