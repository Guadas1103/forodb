import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiRestService {
urlLogin = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDYtGgFVJyBvG5b--TZcGYnpu_BHZV_HmU";
urlRegister = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDYtGgFVJyBvG5b--TZcGYnpu_BHZV_HmU";
url = "https://firestore.googleapis.com/v1/projects/jaguarnewsdb/databases/(default)/documents/"

constructor(private http: HttpClient) { }
    login(email: string, pass:string){

      return this.http.post(this.urlLogin, {email:email,password:pass,returnSecureToken:true})
    }
    register(email: string, pass:string){
  
      return this.http.post(this.urlRegister, {email:email,password:pass,returnSecureToken:true})
    }
    getAllPreguntas(){
      return this.http.get<any>(this.url + "preguntas?pageSize=100")
    }
    cratePregunta(categoria:string, correo:string, pregunta:string, fecha:string){
      const newDoc ={"fields": {
        "categoria": {
          "stringValue": categoria
        },
        "pregunta": {
          "stringValue": pregunta
        },
        "fecha": {
          "timestampValue": fecha
        },
        "correo": {
          "stringValue": correo
        }
      }
    }
      return this.http.post(this.url + "preguntas", newDoc)
    }
    updatePregunta( pregunta:string, id:string){
      const newDoc ={"fields": {
       
        "pregunta": {
          "stringValue": pregunta
        }
      }
    }
      return this.http.patch(this.url + "preguntas/"+id+"?updateMask.fieldPaths=pregunta", newDoc )
    }
    deletePregunta(id:string){
      return this.http.delete(this.url + "preguntas/"+id)
    }


  
}
