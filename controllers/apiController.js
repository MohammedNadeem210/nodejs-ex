var Todo=require('../models/todoModel');
var bodyParser=require('body-parser');
module.exports=function(app){
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));

    app.get('/',function(request,response){
        response.error(404);            
        response.send('Page not found.Please check URL. ');
    });

    app.get('/api/todos/:uname',function(request,response){
        Todo.find({username:request.params.uname},function(error,todo){
            if(error) throw error;
            response.send(todo);
        });
    });

    app.get('/api/todobyId/:userId',function(request,response){
        Todo.findById({ _id: request.params.userId},function(error,todo){
            if(error) throw error;
            response.send(todo);
        });
    });

    app.post('/api/todo',function(request,response){
        if(request.body.id){
            Todo.findByIdAndUpdate(request.body.id,
                {
                    todo:request.body.todo,
                    isDone: request.body.isDone,
                    hasAttachment: request.body.hasAttachment
                }
                ,function(error){
                if(error) throw error;
                response.send('Success');
            });
        }else{
            var newTodo= Todo({
                username:'Nadeem',
                todo:request.body.todo,
                isDone: request.body.isDone,
                hasAttachment: request.body.hasAttachment
            });
            newTodo.save(function(error){
                if(error) throw error;
                response.send('Success'); 
            })
        }
    });

    app.delete('/api/todo',function(request,response){
        Todo.findByIdAndRemove(request.body.id,function(error){
            if(error) throw error;
            response.send('Success');
        });
    });

}