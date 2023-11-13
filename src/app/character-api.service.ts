import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CharacterApiService {
  constructor(private http: HttpClient) {}

  getCharacters(userId: string): any {
    return this.http.get(`http://localhost:3000/char/all?userId=${userId}`);
  }
  getCharacter(characterId: string): any {
    return this.http.get(`http://localhost:3000/char/one?_id=${characterId}`);
  }

  deleteCharacter(id: string): any {
    return this.http.delete(`http://localhost:3000/char/one?_id=${id}`);
  }

  createTestChars(): any {
    const userId = localStorage.getItem('userId')?.replace(/['"]+/g, '');

    return this.http.post(`http://localhost:3000/char/testFill`, {
      userId: userId,
    });
  }
}
