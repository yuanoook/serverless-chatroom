localStorage.serverless_chatroom = localStorage.serverless_chatroom || JSON.stringify({
    msg_list: [],
    user_list: []
});

function addMsg(obj){
    var msg = $.extend({
        id: $.randomId()
    },obj);
    var msg_list = getMsgList();
    msg_list.push(msg);
    localStorage.serverless_chatroom = JSON.stringify({
        msg_list: msg_list,
        user_list: getUserList()
    })
    return msg.id;
}

function loginUserByName(user_name){
    var user = findUserByName(user_name);

    if(!user){
        var user_id = addUser({
            name: user_name,
            active: true
        })
        return user_id
    }

    if(!user.active){
        updateUserById(user.id,{
            active: true
        },user)
        return user.id
    }
    
    return false;
}

function logoutUserById(user_id){
    var user_list = getUserList();
    var user = user_list.filter(function(user){
        return user.id === user_id
    })[0];
    if(user && user.active){
        updateUserById(user.id,{
            active: false
        },user)
        return user.id
    }

    return false;
}

function addUser(obj){
    var user = $.extend({
        id: $.randomId()
    },obj);
    var user_list = getUserList();
    user_list.push(user);
    localStorage.serverless_chatroom = JSON.stringify({
        msg_list: getMsgList(),
        user_list: user_list
    })
    return user.id;
}

function deleteMsgById(msg_id){
    var msg = getMsgById(msg_id);
    if(!msg || msg.deleted){
        return;
    }
    updateMsgById(msg.id,{
        deleted: true
    })
}

function updateMsgById(msg_id,obj){
    var msg_list = getMsgList();
    msg_list.forEach(function(msg){
        if(msg.id === msg_id){
            $.extend(msg,obj)
        }
    })
    localStorage.serverless_chatroom = JSON.stringify({
        msg_list: msg_list,
        user_list: getUserList()
    })
}

function updateUserNameById(user_id,user_name){
    var user = findUserByName(user_name);
    if(user){
        return false;
    }
    return updateUserById(user_id,{
        name: user_name
    })
}

function updateUserById(user_id,obj){
    var user_list = getUserList();
    user_list.forEach(function(user){
        if(user.id === user_id){
            $.extend(user,obj)
        }
    })
    localStorage.serverless_chatroom = JSON.stringify({
        user_list: user_list,
        msg_list: getMsgList()
    })
    return user_id
}

function findUserByName(user_name){
    var user_list = getUserList();
    var user = user_list.filter(function(user){
        return user.name === user_name
    })[0]
    return user
}

function getMsgById(msg_id){
    var msg_list = getMsgList();
    return msg_list.filter(function(msg){
        return msg.id === msg_id
    })[0]
}

function getUserById(user_id){
    var user_list = getUserList();
    return user_list.filter(function(user){
        return user.id === user_id
    })[0]
}

function getMsgList(){
    return JSON.parse(localStorage.serverless_chatroom)['msg_list']
}

function getUserList(){
    return JSON.parse(localStorage.serverless_chatroom)['user_list']
}