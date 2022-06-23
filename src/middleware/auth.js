const isAuth = (req, res, next) => {
    if(req.session.user){
        next();
    }else{
        res.redirect('/student_login')
    }
}

const isAdmin = (req, res, next) => {
    if(req.session.user){
        next();
    }else{
        res.redirect('/admin_login')
    }
}


const authPage = (permissions) => {
    return (req, res, next) => {
        const userGender = req.session.user.gender;
        if(permissions.includes(userGender)) {
            next();
        }else{
            res.redirect('/')
        }
    }
}


module.exports = {
    isAuth,
    isAdmin,
    authPage
}