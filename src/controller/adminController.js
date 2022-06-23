const User = require("../model/user")
const Hostel = require("../model/hostels")
const Bello = require("../model/bellohostel")
const Namadi = require('../model/namadihostel')
const Khadija = require('../model/khadijahostel')
const Amina = require('../model/aminahostel')
const Admin = require('../model/admin')


const get_adminDetail = (req, res) => {
    res.render('admin_signup')
};

const post_adminDetail = async(req, res) => {
    try {
        const {username, gender, password} = req.body
        const admin = new Admin({
            username,
            gender,
            password
        });
    
        await admin.save()
        res.redirect('/admin_login')
    } catch (e) {
        res.render('admin_signup',{
            e: "password length must be atleast 8 to above"
        })
    }    
};

const get_adminLogin = (req, res) => {
    res.render('admin_login')
};

const post_adminLogin = async (req, res) => {
    try {
        const admin = await Admin.findByCredentials(req.body.username, req.body.password)
        if (!admin){
            res.redirect('/admin_login')
        }

        req.session.user = admin;
        // console.log(req.session.user)
        res.redirect('/adminmyHostels')
    } catch (e) {
        res.render('admin_login',{
            e: e
        })
    }  
};

const get_adminHomePage = async (req, res) => {
    const host = await Hostel.find({});
    if(!host){
        res.render('admin_home', {
            nothing: "Sorry your list of Hostels is Empty"
        })
    }else{
        res.render('admin_home',{
            host
        })
    }
};

const get_rooms = (req, res) => {
    res.redirect('/adminmyhostels')
};

const post_rooms = async (req, res) => {
    let id = req.body._id;

    const {Name, roomNumber}  = await Hostel.findById({_id: id});

    if( Name === "Bello Muhammad Bello" ){
        const host = await Bello.find({full: "complete"})

        let doc = [];
        let room = [];
        let people = [];
        let stud = [];
        
        if(host){

            //retrieving reserved room number and student id in the room
            for(let i = 0; i < host.length; i++){
                let roomy
                let a = host[i]
                doc.push(a.roomNumber)
                roomy = a.roomies
                for(let i = 0; i < roomy.length; i++){
                    let b = roomy[i];
                    people.push(b)
                }
                
            }

            
            for(let i = 0; i < people.length; i++){
                let a = people[i]
                const user = await User.findOne({regnumber: a});
                
                stud.push(user) 
            }
            
            // //making an array of available room
            for(let i = 1; i <= roomNumber; i++) {
                room.push(i)
            }

            // //removing completely revered room from available room
            for(let i = 0; i < doc.length; i++) {
                let a = doc[i]
                room.splice(room.indexOf(a), 1)
            }
    
            res.render('admin_hostels',{
                Name,
                doc,
                room,
                stud
            })
    }else{
        
        // console.log(doc)        
        for(let i = 1; i <= roomNumber; i++) {
            room.push(i)
        }

        res.render('admin_hostels',{
            Name,
            room,
        })
    }

    }else if (Name === "Namadi Sambo"){
  
        const host = await Namadi.find({full: "complete"})

        // console.log(host.length)
        let doc = [];
        let room = [];
        let people = [];
        let stud = [];
        
        if(host){

            //retrieving reserved room number and student id in the room
            for(let i = 0; i < host.length; i++){
                let roomy
                let a = host[i]
                doc.push(a.roomNumber)
                roomy = a.roomies
                for(let i = 0; i < roomy.length; i++){
                    let b = roomy[i];
                    people.push(b)
                }
                
            }

            
            for(let i = 0; i < people.length; i++){
                let a = people[i]
                const user = await User.findOne({regnumber: a});
                
                stud.push(user) 
            }
            
            // //making an array of available room
            for(let i = 1; i <= roomNumber; i++) {
                room.push(i)
            }

            // //removing completely revered room from available room
            for(let i = 0; i < doc.length; i++) {
                let a = doc[i]
                room.splice(room.indexOf(a), 1)
            }
    
            res.render('admin_hostels',{
                Name,
                doc,
                room,
                stud
            })
    }else{
        
        // console.log(doc)        
        for(let i = 1; i <= roomNumber; i++) {
            room.push(i)
        }

        // console.log(room)

        
        res.render('admin_hostels',{
            Name,
            room,
        })
    }

    }else if (Name === "Amina Bello"){
        const host = await Amina.find({full: "complete"})

        let doc = [];
        let room = [];
        let people = [];
        let stud = [];
        
        if(host){

            //retrieving reserved room number and student id in the room
            for(let i = 0; i < host.length; i++){
                let roomy
                let a = host[i]
                doc.push(a.roomNumber)
                roomy = a.roomies
                for(let i = 0; i < roomy.length; i++){
                    let b = roomy[i];
                    people.push(b)
                }
                
            }

            
            for(let i = 0; i < people.length; i++){
                let a = people[i]
                const user = await User.findOne({regnumber: a});
                
                stud.push(user) 
            }
            
            // //making an array of available room
            for(let i = 1; i <= roomNumber; i++) {
                room.push(i)
            }

            // //removing completely revered room from available room
            for(let i = 0; i < doc.length; i++) {
                let a = doc[i]
                room.splice(room.indexOf(a), 1)
            }
    
            res.render('admin_hostels',{
                Name,
                doc,
                room,
                stud
            })
    }else{
        
               
        for(let i = 1; i <= roomNumber; i++) {
            room.push(i)
        }

        res.render('admin_hostels',{
            Name,
            room,
        })
    }

    }else if(Name === "Khadija Bello"){
  
        const host = await Khadija.find({full: "complete"})

        let doc = [];
        let room = [];
        let people = [];
        let stud = [];
        
        if(host){

            //retrieving reserved room number and student id in the room
            for(let i = 0; i < host.length; i++){
                let roomy
                let a = host[i]
                doc.push(a.roomNumber)
                roomy = a.roomies
                for(let i = 0; i < roomy.length; i++){
                    let b = roomy[i];
                    people.push(b)
                }
                
            }

            
            for(let i = 0; i < people.length; i++){
                let a = people[i]
                const user = await User.findOne({regnumber: a});
                
                stud.push(user) 
            }
            
            // //making an array of available room
            for(let i = 1; i <= roomNumber; i++) {
                room.push(i)
            }

            // //removing completely revered room from available room
            for(let i = 0; i < doc.length; i++) {
                let a = doc[i]
                room.splice(room.indexOf(a), 1)
            }
    
            res.render('admin_hostels',{
                Name,
                doc,
                room,
                stud
            })
                        
        }else{
            
            for(let i = 1; i <= roomNumber; i++) {
                 room.push(i)
            }
            
            res.render('admin_hostels',{
                Name,
                room
            })
        }
    }
    
};

const get_addHostel = (req, res) => {
    res.render('add_hostel')
};

const post_addHostel = async (req, res) => {

    const {Name, gender, roomNumber} = req.body;

    const hostel = new Hostel({
        Name,
        gender,
        roomNumber
    });

    await hostel.save();
    res.redirect('/addhostel') 
};

module.exports = {
    get_adminDetail,
    post_adminDetail,
    get_adminLogin,
    post_adminLogin,
    get_adminHomePage,
    get_rooms,
    post_rooms,
    get_addHostel,
    post_addHostel,
};