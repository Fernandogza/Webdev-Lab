<?php

// GET routes

$app->get('/profile/:id', $authenticate($app, 'guest'), function ($id) use ($app){

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
      'picture' => $user->picture,
    );
	}
	$app->view()->appendData($data);
  $role = $_SESSION['role'];
  if($role == 'admin') {
    $app->render('profile_admin.html.twig');
  }
  else {
    $app->render('profile_user.html.twig');
  }
});

$app->get('/viewProfile/:id', $authenticate($app, 'guest'), function ($id) use ($app){

	$user = R::findOne('user',' id = :param ',
	           array(':param' => $id ));
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
      'picture' => $user->picture,
    );
	}
	$app->view()->appendData($data);
  $role = $_SESSION['role'];
  if($role == 'admin') {
    $app->render('profile_admin.html.twig');
  }
  else {
    $app->render('profile_other_user.html.twig');
  }
});

$app->post('/profile/changepwd', $authenticate($app, 'guest'), function() use ($app) {
  $env = $app->environment();
  $post = (object)$app->request()->post();
  $oldPassword = md5($post->oldPassword);
  $newPassword = md5($post->newPassword);
  $user = R::findOne('user', 'id = ?', [$_SESSION['id']]);

  $app->response->headers->set("Access-Control-Allow-Origin","*");
  $app->response->headers->set("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
  if($oldPassword == $user->password) {
    $user->password = $newPassword;
    R::store($user);
    echo "Success";
    http_response_code(200);
  }
  else {
    echo "Failure";
    http_response_code(400);
  }
  
});

$app->get('/profile', $authenticate($app, 'guest'), function() use ($app){
	$env = $app->environment();
	$user = R::findOne('user',' id = :param ',
	           array(':param' => $_SESSION['id']));

	if($user){
		$app->redirect($env['rootUri'].'profile/'.$user->id);
	}else{
		$app->flash('danger','Error. Usuario no registrado.');
		$app->redirect($env['rootUri']);
	}
});

$app->post('/profile/pic', $authenticate($app, 'guest'), function() use ($app) {
  $env = $app->environment();
  if(isset($_FILES['image'])){
    $errors= array();
    $target_dir = "web/img/profilePics/";
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
        $id = $_SESSION['id'];
        rename ($target_file, $target_dir.$id.'.'.$imageFileType);
        $user = R::load('user', $id);
        $user->picture = '/'.$target_dir.$id.'.'.$imageFileType;
        R::store($user);
      }
    }
    //print_r($target_file);
  }
  $app->redirect('/profile');
});
//Put routes

$app->put("/profile/edit", $authenticate($app, 'guest'), function() use ($app) {
  $env = $app->environment();
  $put = (object)$app->request->put();
  $id = $_SESSION['id'];

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

$app->delete('/profile/:id', $authenticate($app, 'guest'), function($id) use ($app) {
  $user = R::load('user', $id);
  R::trash($user);
  $role = $_SESSION['role'];
  if($role == 'admin') {
    $app->redirect('/admin/logout');
  }
  else {
    $app->redirect('/logout');
  }
});

?>
