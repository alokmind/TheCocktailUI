import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }

  baseURL = environment.baseURL;

  // getCocktails(){
  //   return this.http.get(this.baseURL+'search.php?f=a');
  // }

  searchByFirstLetter(param){
    return this.http.get(this.baseURL+'search.php?f='+param);
  }

  searchByname(param){
    return this.http.get(this.baseURL+'search.php?s='+param);
  }

  getCategoryFilter(){
    return this.http.get(this.baseURL+'list.php?c=list');
  }

  getDrinkCategoryWise(param){
    return this.http.get(this.baseURL+'filter.php?c='+param);
  }

  getGlassFilter(){
    return this.http.get(this.baseURL+'list.php?g=list');
  }

  getDrinkGlassWise(param){
    return this.http.get(this.baseURL+'filter.php?g='+param);
  }

  getIngredientsFilter(){
    return this.http.get(this.baseURL+'list.php?i=list');
  }

  getDrinkIngredientsWise(param){
    return this.http.get(this.baseURL+'filter.php?i='+param);
  }

  getAlcoholicFilter(){
    return this.http.get(this.baseURL+'list.php?a=list');
  }

  getDrinkAlcoholicWise(param){
    return this.http.get(this.baseURL+'filter.php?a='+param);
  }

  getRandomDrink(){
    return this.http.get(this.baseURL+'random.php');
  }
}
