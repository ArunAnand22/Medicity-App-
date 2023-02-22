import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(allstores:[],searchKey:string,propname:string): any[] {
    if(!allstores || searchKey=='' || propname==''){
      return allstores;
    }
    const result:any=[]
    allstores.forEach((store:any)=>{
      if(store[propname].trim().toLowerCase().includes(searchKey.toLowerCase())){
        result.push(store)
      }
    })
    return result;
  }

}
