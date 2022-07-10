$(function(){
  // 初始化滚动条，这个方法存在于scroll.js中
  resetui()
  $('#btnSend').on('click',function(){
    // 获取输入框里的值
    var text=$('#ipt').val().trim()
    // 判断输入框里的值是否为空
    if(text.length<=0){
      return $('#ipt').val('')
    }
    $('.talk_list').append('<li class="right_word"><img src="img/person01.png" /> <span>'+text+'</span></li>')
    resetui()
    $('#ipt').val('')
    getMsg(text)

  })
  //获取机器人返回的消息
  function getMsg(text){
    $.ajax({
      type:'GET',
      url:'http://www.liulongbin.top:3006/api/robot',data:{spoken:text},
      success:function(res){
        console.log(res)
        if(res.message ==='success'){ 
          var msg=res.data.info.text
          $('.talk_list').append('<li class="left_word"><img src="img/person01.png" /> <span>'+msg+'</span></li>')
          resetui()
          getVoice(msg)
        }
      }
    })
  }
  function getVoice(text){
    $.ajax({
      type:'GET',
      url:'http://www.liulongbin.top:3006/api/synthesize',
      data:{
        text:text
      },
      success:function(res){
        console.log(res)
        if(res.status ===200){
          $('#voice').attr('src',res.voiceUrl)
        }

      }


      
    })
  }
  $('#ipt').on('keyup',function(e){
    console.log(e.keyCode)
    if(e.keyCode ===13){
      $('#btnSend').click()

    }
  })
})