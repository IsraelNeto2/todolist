import {object, string} from "yup";


export const GetSchema = object().shape({
     status: string().required().test('isValid', (status) => {
        if(status === "completo" || status === "pendente" || status === "cancelado"){
            return true;
        }else{
            return false;
        }
     })
});

export const GetByIdSchema = object().shape({
    id: string().required().uuid()
});

export const AddSchema = object().shape({
    descricao: string().required(),
    data: string().required(),
    status: string().required().test('addIsValid', (status)=>{
        if(status === "completo" || status === "pendente" || status === "cancelado"){
            return true
        }else{
            return false
        }
    })
});


export const UpdateSchema = object().shape({
    id: string().required("ID"),
    descricao: string().required(),
    data: string().required(),
    status: string().required().test('addIsValid', (status)=>{
        if(status === "completo" || status === "pendente" || status === "cancelado"){
            return true
        }else{
            return false
        }
    })
});
export const DeleteSchema = string().required();
