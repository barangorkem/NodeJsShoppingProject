
exports.get404=(req,res,next)=>{

        //res.status(404).sendFile(path.join(rootDir,'views','404.html'));
        res.render('404',{
            docTitle:'Not Found'
        })
    
}