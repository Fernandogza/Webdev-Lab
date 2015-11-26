<?php

//GET route
$app->get('/dashboard/', $authenticate($app, 'admin'), function () use ($app) {
    $events = R::find('event', 'id_admin = ?', [$_SESSION['id']]);
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

$app->get('/register', $authenticate($app, 'admin'), function () use ($app) {
  $events = R::find('event', 'id_admin = ? ORDER BY date DESC', [$_SESSION['id']]);

  $data = array(
    'events' => $events
  );
  $app->render('register_admin.html.twig', $data);
});

$app->get('/users/', $authenticate($app, 'admin'), function () use ($app) {
    $users = R::find('user','ORDER BY role ASC');
    $data = array('users' => $users);
    $app->render('users_admin.html.twig', $data);
});

$app->get('/events/', $authenticate($app, 'admin'), function () use ($app) {
    $events = R::find('event', 'id_admin = ? ORDER BY date DESC', [$_SESSION['id']]);

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

  $imgs = R::find('eventimg', 'id_event = ?', [$id]);

  $data = array('event' => $event, 'blogs' => $blogs, 'imgs' => $imgs);
  $app->render('event_admin.html.twig', $data);
});

$app->get('/events/:id/schedule', $authenticate($app, 'admin'), function ($id) use ($app) {
  $schedule = R::find('schedule', 'id_event = ?' ,[$id]);

  $data = array('schedules' => $schedule, 'idEvent' => $id);
  $app->render('schedules_admin.html.twig', $data);
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

$app->get('/schedule/delete/:id', $authenticate($app, 'admin'), function ($id) use ($app) {
  $schedule = R::load('schedule', $id);
  $eventId = $schedule->id_event;
  R::trash($schedule);

  $app->redirect('/events/'.$eventId.'/schedule');
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

$app->post('/register', $authenticate($app, 'admin'), function () use ($app) {
	$post = (object)$app->request()->post();
  $eventId = $post->event;

  $csv = array();
  $response = array();
  // check there are no errors
  if($_FILES['csv']['error'] == 0){
      $name = $_FILES['csv']['name'];
      $exp = explode('.', $_FILES['csv']['name']);
      $ext = strtolower(end($exp));
      $type = $_FILES['csv']['type'];
      $tmpName = $_FILES['csv']['tmp_name'];
      // check the file is a csv
      if($ext === 'csv'){
          $csv = array_map('str_getcsv', file($tmpName));
      }
      else {
        $response['file'] = "Archivo invalido. Solo archivos con extension .csv son permitidos!";
      }
  }

  if($csv) {
    $existingUser = array();
    $newUser = array();
    $alreadyRegistered = array();
    $lineErrors = array();
    $schedules = R::findAll('schedule', 'id_event = ?', array($eventId));
    $response = array();
    $errors = array();
    $cont = 1;
    foreach ($csv as $arr) {
      $email = $arr[0];
      $name = $arr[1];
      $lastName = $arr[2];

      if($email == "" || $name == "" || $lastName == "") {
        $lineErrors[] = $cont;
      }
      else {
        $user = R::findOne('user', 'email = ?', [$email]);

        if($user) {
          $existingUser[] = $cont;
        }
        else {
          $user = R::dispense('user');
          $user->firstName = $name;
          $user->lastName = $lastName;
          $user->email = $email;
          $user->password = md5('password');
          $user->role = 'user';
          R::store($user);
          $newUser[] = $cont;
        }
        $user = R::findOne('user', 'email = ?', [$email]);

        $existingRsvp = R::findOne('rsvp', 'id_user = ? and id_event = ?', [$user->id, $eventId]);
        if($existingRsvp) {
          $alreadyRegistered[] = $cont;
        }
        else {
          $rsvp = R::dispense('rsvp');
          $rsvp->idEvent = $eventId;
          $rsvp->idUser = $user->id;
          $rsvp->status = "going";
          R::store($rsvp);
          //foreach($schedules as $conf) {
          //  $personal = R::dispense('personalschedule');
          //  $personal->idUser = $user->id;
          //  $personal->startDate = $conf->start_date;
          //  $personal->endDate = $conf->end_date;
          //  $personal->name = $conf->name;
          //  $personal->description = $conf->description;
          //  R::store($personal);
          //}
        }
      }
      $cont++;
    }
    $response['old'] = json_encode($existingUser);
    $response['new'] = json_encode($newUser);
    $response['registered'] = json_encode($alreadyRegistered);
    $response['fault'] = json_encode($lineErrors);
  }
  $temp = $cont - count($alreadyRegistered) - 1;

  $response['total'] = $temp . " / " . $cont;
  $app->render('logs_admin.html.twig', $response);
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

$app->post('/schedules/new', $authenticate($app, 'admin'), function () use ($app) {
  $post = (object)$app->request()->post();
  $schedule = R::dispense("schedule");
  $schedule->idEvent = $post->idEvent;
  $schedule->startDate = strtotime($post->start_date);
  $schedule->endDate = strtotime($post->end_date);
  $schedule->name = $post->name;
  $schedule->description = $post->description;

  R::store($schedule);

  $app->redirect('/events/'.$post->idEvent."/schedule");
});

$app->post('/schedules/edit', $authenticate($app, 'admin'), function () use ($app) {
  $post = (object)$app->request()->post();
  $schedule = R::load("schedule", $post->id);
  $schedule->startDate = strtotime($post->start_date);
  $schedule->endDate = strtotime($post->end_date);
  $schedule->name = $post->name;
  $schedule->description = $post->description;

  R::store($schedule);

  $app->redirect('/events/'.$post->idEvent."/schedule");
});

$app->post('/events/new', $authenticate($app, 'admin'), function () use ($app) {
  $post = (object)$app->request()->post();
  $event = R::dispense("event");
  $event->id_admin = $_SESSION['id'];
  $event->place = $post->place;
  $event->name = $post->name;
  $event->lat = $post->lat;
  $event->lon = $post->lon;
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
  $event->lat = $post->lat;
  $event->lon = $post->lon;
  $event->date = date("Y-m-d H:i:s",strtotime($post->date));
  $event->description = $post->description;

  R::store($event);

  $app->redirect('/events');
});

$app->post('/events/pic', $authenticate($app, 'admin'), function() use ($app) {
  $post = (object)$app->request()->post();
  $img = R::dispense('eventimg');
  $img->idEvent = $post->id;
  if(isset($_FILES['image'])){
    $errors= array();
    $target_dir = "web/img/eventsImg/";
    $target_file = $target_dir . basename($_FILES["image"]["name"]);
    $imageFileType = pathinfo($target_file,PATHINFO_EXTENSION);

    $extension = array("jpeg","jpg","png", "JPEG", "JPG", "PNG");
    if(in_array($imageFileType,$extension)=== false){
      $errors[]="extension not allowed, please choose a JPEG or PNG file.";
    }

    if($file_size > 2097152){
       $errors[]='File size must be less than 2 MB';
    }
    if(empty($errors)==true){
      if(move_uploaded_file($_FILES["image"]["tmp_name"], $target_file)) {
        $id = $post->id;
        $name = uniqid();
        rename ($target_file, $target_dir.$name.'.'.$imageFileType);
        $img->url = '/'.$target_dir.$name.'.'.$imageFileType;
        R::store($img);
      }
    }
    //print_r($target_file);
  }
  $app->redirect('/events/'.$id);
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
