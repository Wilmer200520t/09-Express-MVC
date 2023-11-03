let tasks=[
    {id:1,title :"Tarea 1",completed:false},
    {id:2,title :"Tarea 2",completed:true}
]


const getAllTask=(req,res)=>{
    res.render("index.pug",{title:"Lista de tareas",tasks}); //no es necesario pasar la carpeta porque se define en app.js 19-21
}
const getAddTaskForm=(req,res)=>{
    res.render("add.pug",{title:"Agregar Tareas"}); //no es necesario pasar la carpeta porque se define en app.js 19-21
}
const addTask=(req,res)=>{
    let {title}=req.body; //llama al req body tittle por name
    let id=tasks.length+1;
    tasks.push({id,title,completed:false});
    res.redirect("/");
}
const geteditTaskForm=(req,res)=>{
    let id=parseInt(req.params.id);//obtienes el id y lo coniertes en int
    let task=tasks.find((task)=>task.id === id);//comprueba si existe ese id en la bd

    if(!task){
        res.redirect("/");//si no existe le redirige al home
    }else{
        res.render("edit",{title:"Editar Tarea",task});//envia ala page edit
    }

}
const editTask=(req,res)=>{
    let id=parseInt(req.params.id);//obtienes el id y lo coniertes en int
    let taskIndex=tasks.findIndex((task)=>task.id === id);//cuesta el index en la bd
    if(taskIndex===-1){
        res.redirect("/");//si no existe
    }else{
        tasks[taskIndex].title=req.body.title //guarda el title
        res.redirect("/");//redirige al home
    }

}
const completedTask=(req,res)=>{
    let id=parseInt(req.params.id);//obtiene el id
    let taskIndex=tasks.findIndex((task)=>task.id === id); //busca el index de ese id
    if(taskIndex===-1){
        res.redirect("/");//si no existe
    }else{
        tasks[taskIndex].completed=true //guarda el title
        res.redirect("/");//redirige al home
    }
}
const uncompletedTask=(req,res)=>{
    let id=parseInt(req.params.id);//obtiene el id
    let taskIndex=tasks.findIndex((task)=>task.id === id); //busca el index de ese id
    if(taskIndex===-1){
        res.redirect("/");//si no existe
    }else{
        tasks[taskIndex].completed=false //guarda el title
        res.redirect("/");//redirige al home
    }
}
const deleteTask=(req,res)=>{
    let id=parseInt(req.params.id);//obtiene el id
    let taskIndex=tasks.findIndex((task)=>task.id === id); //busca el index de ese id
    if(taskIndex===-1){
        res.redirect("/");//si no existe
    }else{
        tasks.splice(taskIndex) //elimina
        res.redirect("/");//redirige al home
    }

    /**
    tasks=tasks.filter((task)=>task.id !== id); //busca el index de ese id
    res.redirect("/");//redirige al home
    **/
}

export default{
    getAllTask,
    getAddTaskForm,
    addTask,
    geteditTaskForm,
    editTask,
    completedTask,
    uncompletedTask,
    deleteTask
}
