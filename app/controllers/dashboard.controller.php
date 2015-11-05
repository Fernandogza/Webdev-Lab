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

$app->get('/events/', $authenticate($app, 'admin'), function () use ($app) {
    $events = R::find('event', 'ORDER BY date DESC');

    $data = array('events' => $events);
    $app->render('events.html.twig', $data);
});

$app->get('/events/:id', $authenticate($app, 'admin'), function ($id) use ($app) {
    $event = R::load('event', $id);
    $blogs = R::find('blog', 'id_event = ?',[$id]);

    foreach ($blogs as $blog) {
    	$user = R::load('user', $blog->id_user);
    	$blog->user = $user->first_name." ".$user->last_name;
    }

    $data = array('event' => $event, 'blogs' => $blogs);
    $app->render('event.html.twig', $data);
});

//POST route
$app->post('/events/new', $authenticate($app, 'admin'), function () use ($app) {
    $post = (object)$app->request()->post();
    $event = R::dispense("event");
    $event->id_admin = $_SESSION['id'];
    $event->place = $post->place;
    $event->name = $post->name;
    $event->date = date("Y-m-d H:i:s",strtotime($post->date));
    $event->description = $post->description;

    R::store($event);

    $app->redirect('/events');
});
//PUT route

//DELETE route

//OPTIONS route

//PATCH route

?>
