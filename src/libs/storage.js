import  path  from "path";

export const storage = async (files,fileName,allowedExtension) => {
    const file = files[fileName];
    const resp = {isok:false,error:null,newName: null};
    const extensionName = path.extname(file.name);
    if(allowedExtension.includes(extensionName)){
        const now = Date.parse(Date());
        resp.newName = now + extensionName;
        resp.error = await file.mv("./storage/imgs/" + resp.newName);

        if(resp.error){
            console.log(resp);
            return resp;
        }
        else{ 
                resp.isok = true;
                console.log(resp);
                return resp;
            }
    }else{
        resp.error = "Formato de archivo Incorrecto";
        return resp;
    }
}

