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
      'email' => $user->email,
      'company' => $user->company,
      'tShirtSize' => $user->tShirtSize,
      'foodPreference' => $user->foodPreference,
      'specialNeeds' => $user->specialNeeds,
    );
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

//Put routes

$app->put("/profile/edit", function() use ($app) {
  $env = $app->environment();
  $put = (object)$app->request->put();
  $id = $_SESSION['id'];
  echo "<script>console.log( 'Debug Hola: " . json_encode($post) . "' );</script>";
  //Retrieve values from form.
  $firstName = $put->firstName;
  $lastName = $put->lastName;
  $email = $put->email;
  $company = $put->company;
  $tShirtSize = $put->tShirtSize;
  $foodPreference = $put->foodPreference;
  $specialNeeds = $put->specialNeeds;

  //Update values from the user id.
  $user = R::load('user', $id);
  $user->firstName = $firstName;
  $user->lastName = $lastName;
  $user->email = $email;
  $user->company = $company;
  $user->tShirtSize = $tShirtSize;
  $user->foodPreference = $foodPreference;
  $user->specialNeeds = $specialNeeds;

  //Store the Update
  R::store($user);
  $app->redirect('/profile');
});

// Delete routes

$app->delete('/profile/:id', function($id) use ($app) {
  $user = R::load('user', $id);
  R::trash($user);
  $app->redirect('/login');
});

?>
