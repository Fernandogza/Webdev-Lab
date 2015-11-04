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
    $group = R::getAll('SELECT user.id, user.first_name, user.last_name, participants.conversation_id
                        FROM participants INNER JOIN user
                        WHERE user.id = participants.user_id
                        AND participants.conversation_id = :conversation AND user.id != :userID',
                        [':conversation' => $chat->conversationId,
                         ':userID' => $_SESSION['id']]);

    $arr[] = $group;
  }
  $id = $_SESSION['id'];
  $notBlocked = R::getAll('SELECT user.id, user.first_name, user.last_name
                           FROM user WHERE user.id != :id AND user.id NOT IN
                           (SELECT blocked.blocked_user FROM user INNER JOIN blocked ON user.id = blocked.user_id)',
                          [':id' => $id]);

  $data = array(
    "chats" => $arr,
    "usersList" => $notBlocked,
  );

  $app->view()->appendData($data);
  $app->render('chat.html.twig', $data);
});


$app->get('/chat/delete/:id', function($id) use($app) {
  $env = $app -> environment();

  $participants = R::findAll('participants', 'conversation_id = ?',
                              array($id));

  $messages = R::findAll('messages', 'conversation_id = ?',
                              array($id));

  $conversation = R::findOne('conversation',' id = :param ',
  	           array(':param' => $id ));

  R::trashAll($participants);
  R::trashAll($messages);
  R::trash($conversation);
  $app->redirect('/chat');
});

$app->post('/chat/newmsg', function() use($app) {
  $env = $app ->environment();
	$post = (object)$app->request()->post();

  $receiver = $post->userId;
  $message = $post->message;
  $id = $_SESSION['id'];

  $existingConversation = R::getCell('SELECT conversation.id
                            FROM conversation INNER JOIN participants
                            WHERE participants.user_id = :id AND conversation.id IN
                            (SELECT P1.user_id FROM participants as P1 JOIN participants as P2
                              ON P1.conversation_id = P2.conversation_id AND P1.user_id != P2.user_id)',
                              [':id' => $receiver]);

  if($existingConversation) {
    $msg = R::dispense('messages');
    echo "<script>console.log( 'Conversation_id: " . $existingConversation. "' );</script>";
    $msg->conversationId = $existingConversation;
    $msg->senderId = $id;
    $msg->message = $message;
    R::store($msg);
    $link = '/chat/'.$existingConversation;
  }
  else {
    $conversation = R::dispense('conversation');
    $timestamp = date('Y-m-d G:i:s');
    $conversation->time = $timestamp;
    R::store($conversation);

    $participant1 = R::dispense('participants');
    $participant2 = R::dispense('participants');
    $participant1->conversationId = $conversation->id;
    $participant1->userId = $id;
    $participant2->conversationId = $conversation->id;
    $participant2->userId = $receiver;
    R::store($participant1);
    R::store($participant2);

    $msg = R::dispense('messages');
    $msg->conversationId = $conversation->id;
    $msg->senderId = $id;
    $msg->message = $message;
    R::store($msg);
    $link = '/chat/'.$conversation->id;
  }

  $app->redirect($link);

});

?>
