<?php

// GET routes

$app->get('/profile/:id', function ($id) use ($app){

	$user = R::findOne('user',' id = :param ',
	           array(':param' => $id )
	         );
	$data;
	if($user){
		$data = array(
      'firstName' => $user->firstName,
      'lastName'  => $user->lastName,
      'email' => $user->email);
	}
	$app->view()->appendData($data);
  $app->render('profile.html.twig');
});


$app->get('/profile', function() use ($app){
	$env = $app->environment();
	$user = R::findOne('user',' id = :param ',
	           array(':param' => $_SESSION['id'] )
	         );

	if($user){
		$app->redirect($env['rootUri'].'profile/'.$user->id);
	}else{
		$app->flash('danger','Error. Usuario no registrado.');
		$app->redirect($env['rootUri']);
	}
});


$app->delete('/profile/:id', function($id) use ($app) {
  $user = R::load('user', $id);
  R::trash($user);
  $app->redirect('/login');
});

?>
