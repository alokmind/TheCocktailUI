import { Component, ViewChild, OnInit } from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ApiService } from './services/api-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ ApiService ]
})
export class AppComponent implements OnInit{
  title = 'theCocktailUI';
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[];
  dataSource:any = [];
  searchType = '1';
  searchField;
  categoryList;
  categoryField;
  glassField;
  glassList;
  ingredientsField;
  ingredientsList;
  alcoholicField; 
  alcoholicList;
  

  constructor(private _apiService : ApiService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.searchByFirstLetter();
    this.getCategoryFilter();
    this.getGlassFilter();
    this.getIngredientsFilter();
    this.getAlcoholicFilter();
  }

  getCategoryFilter(){
    this._apiService.getCategoryFilter().subscribe( (res:any) => {
      this.categoryList = res.drinks;
    },
    (err) => {
      this._snackBar.open("Server or Internet problem", "Close", {
        duration: 2000,
        panelClass: ['mat-toolbar', 'mat-warn']
      });
    })
  }

  categoryChange(){
    if(this.categoryField){      
      this.resetFilter('category');
      this._apiService.getDrinkCategoryWise(this.categoryField).subscribe( (res:any) => {
        
        this.displayedColumns = ['drink_ID', 'drink_name', 'thumbnail'];
       
        this.mapData(res);
      },
      (err) => {
        this._snackBar.open("Server or Internet problem", "Close", {
          duration: 2000,
          panelClass: ['mat-toolbar', 'mat-warn']
        });
      })
    }
  }  

  getGlassFilter(){
    this._apiService.getGlassFilter().subscribe( (res:any) => {
      this.glassList = res.drinks;
    },
    (err) => {
      this._snackBar.open("Server or Internet problem", "Close", {
        duration: 2000,
        panelClass: ['mat-toolbar', 'mat-warn']
      });
    })
  }

  glassChange(){
    if(this.glassField){
      this.resetFilter('glass');
      this._apiService.getDrinkGlassWise(this.glassField).subscribe( (res:any) => {
        this.displayedColumns = ['drink_ID', 'drink_name', 'thumbnail'];
        
        this.mapData(res);
      },
      (err) => {
        this._snackBar.open("Server or Internet problem", "Close", {
          duration: 2000,
          panelClass: ['mat-toolbar', 'mat-warn']
        });
      })
    }
  }

  getIngredientsFilter(){
    this._apiService.getIngredientsFilter().subscribe( (res:any) => {
      this.ingredientsList = res.drinks;
    },
    (err) => {
      this._snackBar.open("Server or Internet problem", "Close", {
        duration: 2000,
        panelClass: ['mat-toolbar', 'mat-warn']
      });
    })
  }

  ingredientsChange(){
    if(this.ingredientsField){
      this.resetFilter('ingredients');
      this._apiService.getDrinkIngredientsWise(this.ingredientsField).subscribe( (res:any) => {
        this.displayedColumns = ['drink_ID', 'drink_name', 'thumbnail'];
        
        this.mapData(res);
      },
      (err) => {
        this._snackBar.open("Server or Internet problem", "Close", {
          duration: 2000,
          panelClass: ['mat-toolbar', 'mat-warn']
        });
      })
    }
  }

  getAlcoholicFilter(){
    this._apiService.getAlcoholicFilter().subscribe( (res:any) => {
      this.alcoholicList = res.drinks;
    },
    (err) => {
      this._snackBar.open("Server or Internet problem", "Close", {
        duration: 2000,
        panelClass: ['mat-toolbar', 'mat-warn']
      });
    })
  }

  alcoholicChange(){
    if(this.alcoholicField){
      this.resetFilter('alcoholic');
      this._apiService.getDrinkAlcoholicWise(this.alcoholicField).subscribe( (res:any) => {
        this.displayedColumns = ['drink_ID', 'drink_name', 'thumbnail'];
        
        this.mapData(res);
      },
      (err) => {
        this._snackBar.open("Server or Internet problem", "Close", {
          duration: 2000,
          panelClass: ['mat-toolbar', 'mat-warn']
        });
      })
    }
  }

  searchChange(){
    this.searchField = ''; 
    this.resetFilter('search');   
  }

  search(){
    if(this.searchField){
      this.searchField.trim();
      if(this.searchType === '1'){
        this.searchByFirstLetter();
      }else if(this.searchType === '2'){
        this.searchByName();
      }
    }else{
      this._snackBar.open("Please type something !!", "Close", {
        duration: 2000,
        panelClass: ['mat-toolbar', 'mat-warn']
      });
    }    
  }

  searchByFirstLetter(){    
    this._apiService.searchByFirstLetter(this.searchField ? this.searchField : 'a').subscribe( (res:any) => {
      this.displayedColumns = ['drink_ID', 'drink_name', 'type', 'category', 'glass', 'ingredients', 'instruction', 'thumbnail'];
      
      this.mapData(res, 'search');
    },
    (err) => {
      this._snackBar.open("Server or Internet problem", "Close", {
        duration: 2000,
        panelClass: ['mat-toolbar', 'mat-warn']
      });
    })
  }

  searchByName(){    
    this._apiService.searchByname(this.searchField).subscribe( (res:any) => {
      this.displayedColumns = ['drink_ID', 'drink_name', 'type', 'category', 'glass', 'ingredients', 'instruction', 'thumbnail'];
      
      this.mapData(res, 'search');      
    },
    (err) => {
      this._snackBar.open("Server or Internet problem", "Close", {
        duration: 2000,
        panelClass: ['mat-toolbar', 'mat-warn']
      });
    })
  }

  getRandomDrink(){
    this._apiService.getRandomDrink().subscribe( (res:any) => {
      console.log(res)
      this.displayedColumns = ['drink_ID', 'drink_name', 'type', 'category', 'glass', 'ingredients', 'instruction', 'thumbnail'];
      this.resetFilter('random');
      this.mapData(res, 'random');      
    },
    (err) => {
      this._snackBar.open("Server or Internet problem", "Close", {
        duration: 2000,
        panelClass: ['mat-toolbar', 'mat-warn']
      });
    })
  }

  mapData(data, type = null){
    if(data.drinks){
      let element_data
      element_data = data.drinks.map( item => {
        if(type === 'search' || type === 'random'){
          return {
            drink_ID : item.idDrink, 
            drink_name : item.strDrink, 
            type: item.strAlcoholic, 
            category : item.strCategory, 
            glass : item.strGlass, 
            ingredients: this.getIngredients(item),
            instruction: item.strInstructions, 
            thumbnail: item.strDrinkThumb
          }
        }else{
          return {
            drink_ID : item.idDrink, 
            drink_name : item.strDrink, 
            thumbnail: item.strDrinkThumb
          }
        }
      })

      this.dataSource = new MatTableDataSource(element_data);
      this.dataSource.sort = this.sort;
    }else{
      this.dataSource = null;
    }
  }

  getIngredients(item){
    let ingredients = [];
    for(let i=1; i<= 15; i++){
      if(item['strIngredient'+i]){
        ingredients.push(item['strIngredient'+i]);
      }
    }
    return ingredients.toString().replace(/,/g, ', ');
  }

  resetFilter(type){
    if(type === 'search'){
      this.categoryField = null;
      this.glassField = null;
      this.ingredientsField = null;
      this.alcoholicField = null;
    }else if(type === 'category'){
      this.searchType = null;
      this.searchField = null;
      this.glassField = null;
      this.ingredientsField = null;
      this.alcoholicField = null;
    }else if(type === 'glass'){
      this.searchType = null;
      this.searchField = null;
      this.categoryField = null;
      this.ingredientsField = null;
      this.alcoholicField = null;
    }else if(type === 'ingredients'){
      this.searchType = null;
      this.searchField = null;
      this.glassField = null;
      this.categoryField = null;
      this.alcoholicField = null;
    }else if(type === 'alcoholic'){
      this.searchType = null;
      this.searchField = null;
      this.glassField = null;
      this.ingredientsField = null;
      this.categoryField = null;
    }else if(type === 'random'){
      this.searchType = null;
      this.searchField = null;
      this.categoryField = null;
      this.glassField = null;
      this.ingredientsField = null;
      this.alcoholicField = null;
    }
  }
}
