<?php

//GET route
$app->get('/dashboard/', $authenticate($app, 'admin'), function () use ($app) {
    $events = R::findAll('event');
    $users = R::find('user','role = ?', ["user"]);

    $data = array(
      'events' => $events,
      'users' => $users
    );
    $app->render('dashboard_admin.html.twig', $data);
});

$app->get('/dashboard/user/:id', $authenticate($app, 'admin'), function($id) use ($app) {
    $users = R::load('user', $id);

    $events = R::getAll('SELECT event.*, rsvp.status FROM rsvp JOIN event JOIN user WHERE rsvp.id_user = user.id AND rsvp.id_event = event.id AND user.id = ?', [$id]);

    $data = array(
      'events' => $events,
      'users' => $users
    );
    $app->render('dashboard_userData_admin.html.twig', $data);
});

$app->get('/dashboard/event/:id', $authenticate($app, 'admin'), function($id) use ($app) {
    $event = R::load('event', $id);
    $blogs = R::find('blog', 'id_event = ? ORDER BY id DESC',[$id]);

    $rsvps = R::find('rsvp', 'id_event = ? AND status = "going"',[$event->id]);
    $event->attending = count($rsvps);
    $rsvps = R::find('rsvp', 'id_event = ? AND status = "maybe"',[$event->id]);
    $event->maybe = count($rsvps);
    $rsvps = R::find('rsvp', 'id_event = ?',[$event->id]);
    $event->invited = count($rsvps);
    $data = array(
      'event' => $event,
    );
    echo "<script>console.log( 'Debug Objects: " . json_encode($data) . "' );</script>";
    $app->render('dashboard_eventData_admin.html.twig', $data);
});

$app->get('/users/', $authenticate($app, 'admin'), function () use ($app) {
    $users = R::find('user','ORDER BY role ASC');
    $data = array('users' => $users);
    $app->render('users_admin.html.twig', $data);
});

$app->get('/events/', $authenticate($app, 'admin'), function () use ($app) {
    $events = R::find('event', 'ORDER BY date DESC');

    $data = array('events' => $events);
    $app->render('events_admin.html.twig', $data);
});

$app->get('/events/:id', $authenticate($app, 'admin'), function ($id) use ($app) {
  $event = R::load('event', $id);
  $blogs = R::find('blog', 'id_event = ? ORDER BY id DESC',[$id]);

  $rsvps = R::find('rsvp', 'id_event = ? AND status = "going"',[$event->id]);
	$event->attending = count($rsvps);
	$rsvps = R::find('rsvp', 'id_event = ? AND status = "maybe"',[$event->id]);
	$event->maybe = count($rsvps);
	$rsvps = R::find('rsvp', 'id_event = ?',[$event->id]);
	$event->invited = count($rsvps);

  foreach ($blogs as $blog) {
  	$user = R::load('user', $blog->id_user);
  	$blog->user = $user->first_name." ".$user->last_name;
  }

  $data = array('event' => $event, 'blogs' => $blogs);
  $app->render('event_admin.html.twig', $data);
});

$app->get('/events/:id/schedule', $authenticate($app, 'admin'), function ($id) use ($app) {
  $schedule = R::find('schedule', 'id_event = ?' ,[$id]);

  $data = array('schedule' => $schedule);
  $app->render('schedule_admin.html.twig', $data);
});

$app->get('/users/delete/:id', $authenticate($app, 'admin'), function ($id) use ($app) {
  $user = R::load('user', $id);
  R::trash($user);

  $app->redirect('/users/');
});

$app->get('/events/delete/:id', $authenticate($app, 'admin'), function ($id) use ($app) {
  $event = R::load('event', $id);
  R::trash($event);

  $app->redirect('/events/');
});

$app->get('/blog/delete/:id', $authenticate($app, 'admin'), function ($id) use ($app) {
  $blog = R::load('blog', $id);
  $id_event = $blog->id_event;
  R::trash($blog);

  $app->redirect('/events/'.$id_event);
});

//POST route
$app->post('/users/new', $authenticate($app, 'admin'), function () use ($app) {
	$post = (object)$app->request()->post();

  $user = R::dispense('user');
  $user->first_name = $post->first_name;
  $user->last_name = $post->last_name;
  $user->email = $post->email;
  $user->password = md5($post->password);
  $user->role = $post->role;
  R::store($user);

  $app->redirect('/users');
});

$app->post('/users/edit', $authenticate($app, 'admin'), function () use ($app) {
	$post = (object)$app->request()->post();

  $user = R::load('user', $post->id);
  $user->first_name = $post->first_name;
  $user->last_name = $post->last_name;
  $user->email = $post->email;
  R::store($user);

  $app->redirect('/users');
});

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

$app->post('/events/edit', $authenticate($app, 'admin'), function () use ($app) {
  $post = (object)$app->request()->post();
  $event = R::load("event",$post->id);
  $event->place = $post->place;
  $event->name = $post->name;
  $event->date = date("Y-m-d H:i:s",strtotime($post->date));
  $event->description = $post->description;

  R::store($event);

  $app->redirect('/events');
});

$app->post('/blog/new', $authenticate($app, 'admin'), function () use ($app) {
  $post = (object)$app->request()->post();
  $blog = R::dispense("blog");
  $blog->id_user = $_SESSION['id'];
  $blog->id_event = $post->id_event;
  $blog->text = $post->text;

  R::store($blog);

  $app->redirect('/events/'.$post->id_event);
});
//PUT route

//DELETE route

//OPTIONS route

//PATCH route

?>
