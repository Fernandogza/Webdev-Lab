<?php

// GET routes

$app->get('/chat/:id', $authenticate($app, 'guest'), function ($id) use ($app){

  $messages = R::getAll('SELECT messages.message, messages.time, user.first_name, user.last_name
                         FROM messages INNER JOIN user WHERE messages.sender_id=user.id
                         AND messages.conversation_id=:param ORDER BY messages.time ASC',
                         [':param' => $id]);

	$data = array(
    "data" => $messages,
    "conversation" => $id,
  );
	$app->view()->appendData($data);
  $role = $_SESSION['role'];
  if($role == 'admin') {
    $app->render('chat_messages_admin.html.twig');
  }
  else {
    $app->render('chat_messages_user.html.twig');
  }
});


$app->get('/chat', $authenticate($app, 'guest'), function() use ($app){
  $env = $app->environment();

  //Retrieve list of users the user can msg.
  $id = $_SESSION['id'];
  $notBlocked = R::getAll('SELECT user.id, user.first_name, user.last_name
                           FROM user WHERE user.id != :id AND user.id NOT IN
                           (SELECT blocked.blocked_user FROM user INNER JOIN blocked ON user.id = blocked.user_id)',
                          [':id' => $id]);

  //Retrieve list of blocked users (from the user perspective)
  $blocked = R::getAll('SELECT user.id, user.first_name, user.last_name
                        FROM user INNER JOIN blocked
                        WHERE user.id = blocked.blocked_user AND blocked.user_id = :id',
                        [':id' => $id]);

  // Find all chats in which the user is involved.
  $chats = R::findAll('participants', 'user_id = ?',
                      array($_SESSION['id']));
  $arr = array();
  foreach($chats as $chat) {
    $group = R::getAll('SELECT user.id, user.first_name, user.last_name, user.picture, participants.conversation_id
                        FROM participants INNER JOIN user
                        WHERE user.id = participants.user_id
                        AND participants.conversation_id = :conversation AND user.id != :userID AND user.id NOT IN
                        (SELECT blocked.blocked_user FROM blocked WHERE blocked.user_id = :userID2)',
                        [':conversation' => $chat->conversationId,
                         ':userID' => $id,
                         ':userID2' => $id]);
    if($group)
      $arr[] = $group;
  }

  $data = array(
    "chats" => $arr,
    "usersList" => $notBlocked,
    "blockedList" => $blocked,
  );

  $app->view()->appendData($data);
  $role = $_SESSION['role'];
  if($role == 'admin') {
    $app->render('chat_admin.html.twig', $data);
  }
  else {
    $app->render('chat_user.html.twig', $data);
  }
});


$app->get('/chat/delete/:id', $authenticate($app, 'guest'), function($id) use($app) {
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

$app->get('/unblock/:id', $authenticate($app, 'guest'), function($id) use($app) {
  $env = $app ->environment();
  $userId = $_SESSION['id'];

  $blocked = R::findOne('blocked', 'blocked_user = :block AND user_id = :id',
                        array(':block' => $id, ':id' => $userId));

  R::trash($blocked);
  $app->redirect('/chat');
});

$app->post('/block', $authenticate($app, 'guest'), function() use($app) {
  $env = $app ->environment();
  $post = (object)$app->request()->post();
  $id = $_SESSION['id'];
  $blockedUser = $post->blockedUser;

  $block = R::dispense('blocked');
  $block->userId = $id;
  $block->blockedUser = $blockedUser;

  R::store($block);
  $app->redirect('/chat');
});

$app->post('/chat/reply/:id', $authenticate($app, 'guest'), function($id) use($app) {
  $env = $app ->environment();
  $post = (object)$app->request()->post();

  $message = $post->message;
  if($message != "") {
    $senderId = $_SESSION['id'];

    $reply = R::dispense('messages');
    $reply->conversationId = $id;
    $reply->message = $message;
    $reply->senderId = $senderId;
    R::store($reply);
  }
  $link = "/chat/".$id;
  $app->redirect($link);

});

$app->get('/blockUser/:id', $authenticate($app, 'guest'), function($id) use($app) {
  $env = $app ->environment();
  $userId = $_SESSION['id'];

  $blockedUser = R::findOne('participants', 'conversation_id = :id AND user_id != :id2',
                            array(':id' => $id, ':id2' => $userId));

  $block = R::dispense('blocked');
  $block->userId = $userId;
  $block->blockedUser = $blockedUser->userId;

  R::store($block);
  $app->redirect('/chat');
});

$app->post('/chat/newmsg', $authenticate($app, 'guest'), function() use($app) {
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
