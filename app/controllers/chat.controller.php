<?php

// GET routes

$app->get('/chat/:id', function ($id) use ($app){

  $messages = R::getAll('SELECT messages.message, messages.time, user.first_name, user.last_name
                         FROM messages INNER JOIN user WHERE messages.sender_id=user.id
                         AND messages.conversation_id=:param',
                         [':param' => $id]);

	$data = array(
    "data" => $messages,
  );
	$app->view()->appendData($data);
  $app->render('chat_messages.html.twig');
});


$app->get('/chat', function() use ($app){
	$env = $app->environment();

  $chats = R::findAll('participants', 'user_id = ?',
                      array($_SESSION['id']));
  $arr = array();
  foreach($chats as $chat) {
    $group = R::getAll('SELECT user.id, user.first_name, user.last_name, participants.conversation_id FROM participants INNER JOIN user WHERE user.id = participants.user_id AND participants.conversation_id = :conversation AND user.id != :userID',
                        [':conversation' => $chat->conversationId,
                         ':userID' => $_SESSION['id']]);

    $arr[] = $group;
    echo("<script>console.log('PHP: ".json_encode($group)."');</script>");
  }
  $data = array(
    "data" => $arr,
  );
  $app->view()->appendData($data);
  $app->render('chat.html.twig', $data);
});

?>
