const User = require("../model/user")
const Hostel = require("../model/hostels")
const Bello = require("../model/bellohostel")
const Namadi = require('../model/namadihostel')
const Khadija = require('../model/khadijahostel')
const Amina = require('../model/aminahostel')


const homePage = (req, res) => {
    res.render('index')
};

const get_studentLogin =  (req, res) => {
    res.render('student_login')
};

const post_studentLogin = async (req, res) => {

    try {
       const {regnumber, password} = req.body;
       const user = await User.findByCredentials( regnumber, password );

       if (!user){
           res.redirect('/student_login')
       }

       req.session.user = user;
       res.redirect('/hostels')

   } catch (e) {
       res.render('student_login',{
           e: e
       })
   } 
};

const get_hostels =  async (req, res) => {

    const user = await User.findOne({_id: req.session.user._id})


    if(user.gender === "male"){
        res.redirect('/malehostel')
    }else{
        res.redirect('/femalehostel')
    }

};

const get_malehostel = async (req, res) => {
    const reg = req.session.user.regnumber
    const bello = await Bello.findOne({roomies: reg })
    const namadi = await Namadi.findOne({roomies: reg})
    const host = await Hostel.find({gender: "male"});
    const M = "male";

    if(bello || namadi){
        res.redirect('/reserve')
        
        
    }else{
        res.render('hostels',{
            M,
            host
        })
        
    }
};

const get_femaleHostel = async (req, res) => {

    const reg = req.session.user.regnumber
    const amina = await Amina.findOne({roomies: [req.session.user.regnumber]});
    const khadija = await Khadija.findOne({roomies: req.session.user.regnumber});
    const host = await Hostel.find({gender: "female"});

    // console.log(khadija)
   
    if(amina || khadija){
        res.redirect('/reserve')
        
    }else{
        res.render('hostels',{
            host
        })

    }
}

const get_malerooms = (req, res) => {
    res.redirect('/hostels')
}

const get_femalerooms = (req, res) => {
    res.redirect('/hostels')
}

const post_malerooms = async (req, res) => {
    let id = req.body._id;
    const {Name, roomNumber}  = await Hostel.findById({_id: id});


    if( Name === "Bello Muhammad Bello" ){
        const host = await Bello.find({full: "complete"});

        let doc = []
        let room = [];
        
        if(!host){

            for(let i = 1; i <= roomNumber; i++) {
                room.push(i)
            }

            res.render('male_rooms',{
                Name,
                room,
            });

            
        }else{

            //looping and pushing room number of compeletely reserved room in an array
            for(let i = 0; i < host.length; i++){

                let a = host[i]
                doc.push(a.roomNumber)      
            }

            //making an array for room numbers to display    
            for(let i = 1; i <= roomNumber; i++) {
                room.push(i)
            }
    
            //removing the number of rooms that are compeletly reserved to get number of available room
            for(let i = 0; i < doc.length; i++) {
                let a = doc[i]
                room.splice(room.indexOf(a), 1)
            }
    
            res.render('male_rooms',{
                Name,
                room,
            });

        }

    }else if ( Name === "Namadi Sambo" ){
  
        const host = await Namadi.find({full: "complete"})

        let doc = []
        let room = [];
        let hostelName = Name;
        
        if(!host){

            for(let i = 1; i <= roomNumber; i++) {
                room.push(i)
            }
            
            res.render('male_rooms',{
            hostelName,
            room,
            });

        }else{
            //looping and pushing room number of compeletely reserved room in an array
            for(let i = 0; i < host.length; i++){

                let a = host[i]
                doc.push(a.roomNumber)
                
            }
             
            //making an array for room numbers to display
            for(let i = 1; i <= roomNumber; i++) {
                room.push(i)
            }
    
            //removing the number of rooms that are compeletly reserved to get number of available room
            for(let i = 0; i < doc.length; i++) {
                let a = doc[i]
                room.splice(room.indexOf(a), 1)
            }

            res.render('male_rooms',{
                hostelName,
                room,
            })

            
        }

    }
}

const post_femalerooms = async (req, res) => {
    let id = req.body._id;

    const {Name, roomNumber}  = await Hostel.findById({_id: id});

    if(Name === "Amina Bello"){
        const host = await Amina.find({full: "complete"})

        let doc = []
        let room = [];
        
        if(host){
            //looping and pushing room number of compeletely reserved room in an array
            for(let i = 0; i < host.length; i++){
                let a = host[i]
                doc.push(a.roomNumber)     
            }
            
            //making an array for room numbers to display
            for(let i = 1; i <= roomNumber; i++) {
                room.push(i)
            }

            //removing the number of rooms that are compeletly reserved to get number of available room
            for(let i = 0; i < doc.length; i++) {
                let a = doc[i]
                room.splice(room.indexOf(a), 1)
            }
    
            res.render('female_rooms',{
                Name,
                room,
            })
    }else{
               
        for(let i = 1; i <= roomNumber; i++) {
            room.push(i)
        }

        res.render('female_rooms',{
            Name,
            room,
        })
    }

    }else if (Name === "Khadija Bello"){
  
        const host = await Khadija.find({full: "complete"})

        let doc = []
        let room = [];
        let hostelName = Name;
        
        if(host){
            for(let i = 0; i < host.length; i++){

                let a = host[i]
                doc.push(a.roomNumber)   
            }
                    
            for(let i = 1; i <= roomNumber; i++) {
                room.push(i)
            }
    
            for(let i = 0; i < doc.length; i++) {
                let a = doc[i]
                room.splice(room.indexOf(a), 1)
            }
    
            res.render('female_rooms',{
                hostelName,
                room,
            })
        }else{
            
            for(let i = 1; i <= roomNumber; i++) {
                 room.push(i)
            }
            
            res.render('female_rooms',{
                hostelName,
                room
            })
        }

    }
}

const get_reserveBelloHostel = (req, res) => {
    res.redirect('/rooms')
}

const post_reserveBelloHostel = async (req, res) => {
    
    const reserve = await Bello.findOne({roomNumber: req.body.roomNumber })
    
    if(!reserve) {
        const hostName = "Bello Muhammad Bello";
        const rooms = new Bello({
            roomNumber: req.body.roomNumber,
            roomies: [
                req.session.user.regnumber
            ]
        })

        const user = await User.findOneAndUpdate({_id: req.session.user._id}, {hostName: hostName, room: req.body.roomNumber})
        await user.save();
        await rooms.save();
        res.redirect('/reserve')

    }else if (reserve ){

        const user = await User.findOneAndUpdate({_id: req.session.user._id}, {hostName: reserve.hostName, room: req.body.roomNumber})
        let owner = reserve.roomies
        owner.push(req.session.user.regnumber)

        if(owner.length === 4){
            await Bello.updateOne(
                {roomNumber: req.body.roomNumber},
                {
                        full: "complete",
                        
                }
            )
            reserve.update(
                {roomNumber: req.body.roomNumber},
                {
                    $set: {
                        roomies: owner
                        
                    }
                }
            )

            await reserve.save()
            await user.save();
            res.redirect('/reserve')
        }else{

            reserve.update(
                {roomNumber: req.body.roomNumber},
                {
                    $set: {
                        
                        roomies: owner
                    }
                }
            )

            await reserve.save()
            await user.save();
            res.redirect('/reserve')
            
        }
    }

}

const get_reserveNamadiHostel = (req, res) => {
    res.redirect('/rooms')
}

const post_reserveNamadiHostel = async (req, res) => {
    
    const namadi = await Namadi.findOne({roomNumber: req.body.roomNumber})

    if(!namadi) {

        const hostName = "Namadi Sambo";
        const rooms = new Namadi({
            roomNumber: req.body.roomNumber,
            roomies: [
                req.session.user.regnumber
            ]
        })

        const user = await User.findOneAndUpdate({_id: req.session.user._id}, {hostName: hostName, room: req.body.roomNumber})
        await user.save();
        await rooms.save();
        res.redirect('/reserve')

    }else if ( namadi ){

        const user = await User.findOneAndUpdate({_id: req.session.user._id}, {hostName: namadi.hostName, room: req.body.roomNumber})
        let owner = namadi.roomies
        owner.push(req.session.user.regnumber) 

        if(owner.length === 4){
            await Namadi.updateOne(
                {roomNumber: req.body.roomNumber},
                {
                    full: "complete",
                        
                }
            )
            namadi.update(
                {roomNumber: req.body.roomNumber},
                {
                    $set: {
                        roomies: owner
                        
                    }
                }
            )

            await namadi.save()
            await user.save();
            res.redirect('/reserve')
        }else{
            namadi.update(
                {roomNumber: req.body.roomNumber},
                {
                    $set: { 
                        roomies: owner
                    }
                }
            )

            await namadi.save()
            await user.save();
            res.redirect('/reserve')
            
        } 
    }
}

const get_reserveAminaHostel = (req, res) => {
    res.redirect('/rooms')
}

const post_reserveAminaHostel = async (req, res) => {
    
    const reserve = await Amina.findOne({roomNumber: req.body.roomNumber })
    
    if(!reserve) {
        const hostName = "Amina Bello";
        const rooms = new Amina({
            roomNumber: req.body.roomNumber,
            roomies: [
                req.session.user.regnumber
            ]
        })

        const user = await User.findOneAndUpdate({_id: req.session.user._id}, {hostName: hostName, room: req.body.roomNumber})
        await user.save();
        await rooms.save();
        res.redirect('/reserve')

    }else if (reserve ){

        const user = await User.findOneAndUpdate({_id: req.session.user._id}, {hostName: reserve.hostName, room: req.body.roomNumber})
        let owner = reserve.roomies
        owner.push(req.session.user.regnumber)

        if(owner.length === 4){
            await Amina.updateOne(
                {roomNumber: req.body.roomNumber},
                {
                        full: "complete",
                        
                }
            )
            reserve.update(
                {roomNumber: req.body.roomNumber},
                {
                    $set: {
                        roomies: owner
                        
                    }
                }
            )

            await reserve.save()
            await user.save();
            res.redirect('/reserve')
        }else{
            reserve.update(
                {roomNumber: req.body.roomNumber},
                {
                    $set: {
                        
                        roomies: owner
                    }
                }
            )

            await reserve.save()
            await user.save();
            res.redirect('/reserve')
            
        }
        
    }
}

const get_reserveKhadijaHostel = (req, res) => {
    res.redirect('/rooms')
}

const post_reserveKhadijaHostel = async (req, res) => {
    
    const reserve = await Khadija.findOne({roomNumber: req.body.roomNumber })
    
    if(!reserve) {

        const hostName = "Khadija Bello";
        const rooms = new Khadija({
            roomNumber: req.body.roomNumber,
            roomies: [
                req.session.user.regnumber
            ]
        })

        const user = await User.findOneAndUpdate({_id: req.session.user._id}, {hostName: hostName, room: req.body.roomNumber})
        await user.save();
        await rooms.save();
        res.redirect('/reserve')
      
    }else if (reserve ){

        let owner = reserve.roomies
        owner.push(req.session.user.regnumber)

        if(owner.length === 4){
            await Khadija.updateOne(
                {roomNumber: req.body.roomNumber},
                {
                        full: "complete",
                        
                }
            )
            reserve.update(
                {roomNumber: req.body.roomNumber},
                {
                    $set: {
                        roomies: owner
                        
                    }
                }
            )

            const user = await User.findOneAndUpdate({_id: req.session.user._id}, {hostName: reserve.hostName, room: req.body.roomNumber})
            await reserve.save()
            await user.save();
            res.redirect('/reserve')
        }else{
            reserve.update(
                {roomNumber: req.body.roomNumber},
                {
                    $set: {
                        
                        roomies: owner
                    }
                }
            )

            const user = await User.findOneAndUpdate({_id: req.session.user._id}, {hostName: reserve.hostName, room: req.body.roomNumber})
            await reserve.save()
            // await user.save();
            res.redirect('/reserve')
            
        }
        
    }
}

const get_reserve = async (req, res) => {

    const user = await User.findOne({_id: req.session.user._id})
    const bello = await Bello.findOne({roomies: req.session.user.regnumber});
    const namadi = await Namadi.findOne({roomies: req.session.user.regnumber});
    const khadija = await Khadija.findOne({roomies: req.session.user.regnumber});
    const amina = await Amina.findOne({roomies: req.session.user.regnumber});

    if(bello){

        res.render('reserve', {
            firstname: user.firstName,
            lastname: user.lastName,
            othername: user.otherName,
            hostname: user.hostName,
            reg: user.regnumber,
            room: user.room
        });

    }else if(namadi){

        res.render('reserve', {
            firstname: user.firstName,
            lastname: user.lastName,
            othername: user.otherName,
            hostname: user.hostName,
            reg: user.regnumber,
            room: user.room
        });
         
    }else if(khadija){

        res.render('reserve', {
            firstname: user.firstName,
            lastname: user.lastName,
            othername: user.otherName,
            hostname: user.hostName,
            reg: user.regnumber,
            room: user.room
        }); 

    }else if(amina){
        
        res.render('reserve', {
            firstname: user.firstName,
            lastname: user.lastName,
            othername: user.otherName,
            hostname: user.hostName,
            reg: user.regnumber,
            room: user.room
        }); 
    }
}

const get_studentDetails = (req, res) => {
    res.render('student_details')
}

const post_studentDetails = async (req, res) => {

    try {

        const {firstName, lastName, otherName, regnumber, level, gender, phone, password} = req.body;
        
        const checkReg = await User.find({regnumber: regnumber})
        
        if(checkReg) {
            throw Error('Reg.Number Exist')
        }

        const user = new User({
            firstName,
            lastName,
            otherName,
            regnumber,
            level,
            gender,
            phone,
            password
        })
    
        await user.save()
        res.redirect('/')
        
    } catch (e) {
      
        res.redirect('/signup', {e: e})
        
    }
    
}

module.exports = {
    homePage,
    get_studentLogin,
    post_studentLogin,
    get_hostels,
    get_malehostel,
    get_femaleHostel,
    get_malerooms,
    get_femalerooms,
    post_malerooms,
    post_femalerooms,
    get_reserveBelloHostel,
    post_reserveBelloHostel,
    get_reserveNamadiHostel,
    post_reserveNamadiHostel,
    get_reserveAminaHostel,
    post_reserveAminaHostel,
    get_reserveKhadijaHostel,
    post_reserveKhadijaHostel,
    get_reserve,
    get_studentDetails,
    post_studentDetails
}
