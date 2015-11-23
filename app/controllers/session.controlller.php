<?php

//GET routes

$app->get("/logout", function () use ($app) {
  $env = $app->environment();
  unset($_SESSION['user']);
  $app->view()->setData('user', null);
  $app->redirect("/login");
});

$app->get("/admin/logout", function () use ($app) {
  $env = $app->environment();
  unset($_SESSION['user']);
  $app->view()->setData('user', null);
  $app->redirect("/admin/login");
});

$app->get("/admin/login", function () use ($app) {

  if(isset($_SESSION['user'])){
    $app->redirect("/dashboard");
  }
  $env = $app->environment();

  $flash = $app->view()->getData('flash');

  $error = '';
  if (isset($flash['danger'])) {
     $error = $flash['danger'];
  }

  $urlRedirect = $env['rootUri'];

  if ($app->request()->get('r') && $app->request()->get('r') != '/logout' && $app->request()->get('r') != '/login') {
     $_SESSION['urlRedirect'] = $app->request()->get('r');
  }

  if (isset($_SESSION['urlRedirect'])) {
     $urlRedirect = $_SESSION['urlRedirect'];
  }

  $email_value = $email_error = $password_error = '';

  if (isset($flash['email'])) {
    $email_value = $flash['email'];
  }

  if (isset($flash['errors']['email'])) {
     $email_error = $flash['errors']['email'];
  }

  if (isset($flash['errors']['password'])) {
     $password_error = $flash['errors']['password'];
  }

  $app->render('login_admin.html.twig',
    array(
      'error' => $error,
      'email_value' => $email_value,
      'email_error' => $email_error,
      'password_error' => $password_error,
      'urlRedirect' => $urlRedirect
    )
  );
});

$app->get("/login", function () use ($app) {

  if(isset($_SESSION['user'])){
    $app->redirect("/profile");
  }
  $env = $app->environment();

  $flash = $app->view()->getData('flash');

  $error = '';
  if (isset($flash['danger'])) {
     $error = $flash['danger'];
  }

  $urlRedirect = $env['rootUri'];

  if ($app->request()->get('r') && $app->request()->get('r') != '/logout' && $app->request()->get('r') != '/login') {
     $_SESSION['urlRedirect'] = $app->request()->get('r');
  }

  if (isset($_SESSION['urlRedirect'])) {
     $urlRedirect = $_SESSION['urlRedirect'];
  }

  $email_value = $email_error = $password_error = '';

  if (isset($flash['email'])) {
    $email_value = $flash['email'];
  }

  if (isset($flash['errors']['email'])) {
     $email_error = $flash['errors']['email'];
  }

  if (isset($flash['errors']['password'])) {
     $password_error = $flash['errors']['password'];
  }

  $app->render('login_user.html.twig',
    array(
      'error' => $error,
      'email_value' => $email_value,
      'email_error' => $email_error,
      'password_error' => $password_error,
      'urlRedirect' => $urlRedirect
    )
  );
});

$app->get("/signup", function () use ($app) {
  $env = $app->environment();

  $flash = $app->view()->getData('flash');

  $error = '';
  if (isset($flash['danger'])) {
     $error = $flash['danger'];
  }

  $urlRedirect = $env['rootUri'];

  if ($app->request()->get('r') && $app->request()->get('r') != '/logout' && $app->request()->get('r') != '/login') {
     $_SESSION['urlRedirect'] = $app->request()->get('r');
  }
  if (isset($_SESSION['urlRedirect'])) {
     $urlRedirect = $_SESSION['urlRedirect'];
  }
  $email_error = '';
  if (isset($flash['errors']['email'])) {
     $email_error = $flash['errors']['email'];
  }
  $app->render('signup_user.html.twig',
    array(
      'error' => $error,
      'email_error' => $email_error,
      'urlRedirect' => $urlRedirect
    )
  );
});

$app->get("/admin/signup", function () use ($app) {
  $env = $app->environment();

  $flash = $app->view()->getData('flash');

  $error = '';
  if (isset($flash['danger'])) {
     $error = $flash['danger'];
  }

  $urlRedirect = $env['rootUri'];

  if ($app->request()->get('r') && $app->request()->get('r') != '/logout' && $app->request()->get('r') != '/login') {
     $_SESSION['urlRedirect'] = $app->request()->get('r');
  }
  if (isset($_SESSION['urlRedirect'])) {
     $urlRedirect = $_SESSION['urlRedirect'];
  }
  $email_error = '';
  if (isset($flash['errors']['email'])) {
     $email_error = $flash['errors']['email'];
  }
  $app->render('signup_admin.html.twig',
    array(
      'error' => $error,
      'email_error' => $email_error,
      'urlRedirect' => $urlRedirect
    )
  );
});

//POST routes

$app->post("/admin/login", function () use ($app) {
  $env = $app->environment();
  $post = (object)$app->request()->post();
  $email    =   $post->email;
  $password   = md5($post->password);

  $errors = array();

  /*
  * Logica de login
  */
  $user = R::findOne('user',' email = :param ',
             array(':param' => $email ));

  if (!$user || $user->role != 'admin') {
      $errors['password'] = "Email o password incorrecto.";
  } else if ($password != $user->password) {
      $app->flash('email', $email);
      $errors['password'] = "Email o password incorrecto.";
  }

  if (count($errors) > 0) {
      $app->flash('errors', $errors);
      $app->redirect('/admin/login');
  }

  $_SESSION['user'] = $user;

  $_SESSION['id']     = $user->id;
  $_SESSION['nombre'] = $user->firstName;
  $_SESSION['role'] = $user->role;

  if (isset($_SESSION['urlRedirect'])) {
       $tmp = $_SESSION['urlRedirect'];
       unset($_SESSION['urlRedirect']);
       $app->redirect($env['rootUri'].substr($tmp,1));
  }

  $app->redirect('/dashboard');
});

$app->post("/login", function () use ($app) {
  $env = $app->environment();
  $post = (object)$app->request()->post();
  $email    =   $post->email;
  $password   = md5($post->password);

  $errors = array();

  /*
  * Logica de login
  */
  $user = R::findOne('user',' email = :param ',
             array(':param' => $email ));

  if (!$user || $user->role != 'user') {
      $errors['password'] = "Email o password incorrecto.";
  } else if ($password != $user->password) {
      $app->flash('email', $email);
      $errors['password'] = "Email o password incorrecto.";
  }

  if (count($errors) > 0) {
      $app->flash('errors', $errors);
      $app->redirect('/login');
  }

  $_SESSION['user'] = $user;
  $_SESSION['id']     = $user->id;
  $_SESSION['nombre'] = $user->firstName;
  $_SESSION['role'] = $user->role;

  if (isset($_SESSION['urlRedirect'])) {
       $tmp = $_SESSION['urlRedirect'];
       unset($_SESSION['urlRedirect']);
       $app->redirect($env['rootUri'].substr($tmp,1));
  }

  $app->redirect('/profile');
});


$app->post("/signup", function () use ($app) {
  $env = $app->environment();

  $post = (object)$app->request()->post();

  $email     = $post->email;
  $password  = $post->password;
  $firstName = $post->firstName;
  $lastName  = $post->lastName;

  $errors = array();

  /*
  * Logica de signup
  */

  $user = R::findOne('user',' email = :param ',
             array(':param' => $email ));

  if ($user) {
    $errors['email'] = "Email ya registrado.";
  } else {
    $newUser = R::dispense('user');
    $newUser->email = $email;
    $newUser->firstName = $firstName;
    $newUser->lastName = $lastName;
    $newUser->password = md5($password);
    R::store($newUser);
  }
  if (count($errors) > 0) {
      $app->flash('errors', $errors);
      $app->redirect('/signup');
  }
  $app->redirect('/login');
});

$app->post("/admin/signup", function () use ($app) {
  $env = $app->environment();

  $post = (object)$app->request()->post();

  $email     = $post->email;
  $password  = $post->password;
  $firstName = $post->firstName;
  $lastName  = $post->lastName;

  $errors = array();

  /*
  * Logica de signup
  */

  $user = R::findOne('user',' email = :param ',
             array(':param' => $email ));

  if ($user) {
    $errors['email'] = "Email ya registrado.";
  } else {
    $newUser = R::dispense('user');
    $newUser->email = $email;
    $newUser->firstName = $firstName;
    $newUser->lastName = $lastName;
    $newUser->password = md5($password);
    $newUser->role = 'admin';
    R::store($newUser);
  }
  if (count($errors) > 0) {
      $app->flash('errors', $errors);
      $app->redirect('/admin/signup');
  }
  $app->redirect('/admin/login');
});

?>
