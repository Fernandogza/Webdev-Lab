<?php

// GET routes

$app->get('/chat/:id', function ($id) use ($app){

	// $user = R::findOne('user',' id = :param ',
	//            array(':param' => $id )
	//          );
	// $data;
	// if($user){
	// 	$data = array(
  //     'firstName' => $user->firstName,
  //     'lastName'  => $user->lastName,
  //     'email' => $user->email);
	// }
	// $app->view()->appendData($data);
  // $app->render('chat.html.twig');
});


$app->get('/chat', function() use ($app){
	$env = $app->environment();

  $chats = R::findAll('participants', 'user_id = ?',
                      array($_SESSION['id']));
  $arr = array();

  foreach($chats as $chat) {
    $lastMessage = R::findLast('messages', 'conversation_id = :param',
                            array(':param' => $chat->conversationId));
    $arr[] = $lastMessage->export();
  }
  $data = array(
    "data" => $arr,
  );
  $app->view()->appendData($data);
  echo("<script>console.log('PHP: ".json_encode($arr)."');</script>");
  $app->render('chat.html.twig', $data);
});

?>
