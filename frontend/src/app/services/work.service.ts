import { Injectable } from '@angular/core';
import { Allas } from '../shared/Model/Allas';

@Injectable({ providedIn: 'root' })
export class WorkService {
  private key = 'selectedWork';

  setWork(data: Allas) {
    localStorage.setItem(this.key, JSON.stringify(data));
  }

  getWork(): any | null {
    const stored = localStorage.getItem(this.key);
    return stored ? JSON.parse(stored) : null;
  }

  clearWork() {
    localStorage.removeItem(this.key);
  }
}
