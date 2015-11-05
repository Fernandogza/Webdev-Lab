<?php

//GET route
$app->get('/dashboard/', $authenticate($app, 'admin'), function () use ($app) {
    $events = R::find('event', 'date > ?',[date("Y-m-d H:i:s")]);
    foreach ($events as $event) {
    	$rsvps = R::find('rsvp', 'id_event = ? AND status = "going"',[$event->id]);
    	$event->attending = count($rsvps);
    }

    $data = array('events' => $events);
    $app->render('dashboard.html.twig', $data);
});

$app->get('/users/', $authenticate($app, 'admin'), function () use ($app) {
    $users = R::find('user','ORDER BY role ASC');

    $data = array('users' => $users);
    $app->render('users.html.twig', $data);
});

//POST route

//PUT route

//DELETE route

//OPTIONS route

//PATCH route

?>
