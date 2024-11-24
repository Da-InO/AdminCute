import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private configService: ConfigService) {}

  getDashboardMetrics(): Observable<any> {
    return this.configService.getDashboardData();
  }
}
