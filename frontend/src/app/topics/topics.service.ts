import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Topic, TopicStatus } from './topic.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class TopicsService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/topics`;

  getAll(): Observable<Topic[]> {
    return this.http.get<Topic[]>(this.baseUrl);
  }

  getById(id: string): Observable<Topic> {
    return this.http.get<Topic>(`${this.baseUrl}/${id}`);
  }

  update(id: string, payload: Partial<Topic>): Observable<Topic> {
    return this.http.patch<Topic>(`${this.baseUrl}/${id}`, payload);
  }

  prioritize(id: string): Observable<Topic> {
    return this.update(id, { priority: 1 });
  }

  discard(id: string): Observable<Topic> {
    return this.update(id, { status: TopicStatus.DISCARDED });
  }
}
