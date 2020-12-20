import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { rejects } from 'assert';
import { Observable } from 'rxjs';
import { MxvxDbService } from './mxvx-db.service';

@Injectable({
  providedIn: 'root',
})
export class ValidadoresService {
  constructor(private http: MxvxDbService) {}
  noHayCupoMX_1(control: FormControl): Promise<any> | Observable<any> {
    if (!control.value) {
      return Promise.resolve(null);
    }
    return new Promise((resolve, rejects) => {
      if (true) {
        resolve(null);
      } else {
        resolve({ noHayCupoMX_1: true });
      }
    });
  }
}
