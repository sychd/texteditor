import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Http, Response} from '@angular/http';
import {RequestOptionsArgs} from '@angular/http/src/interfaces';
import {URLSearchParams} from '@angular/http/src/url_search_params';
import {catchError, map} from 'rxjs/operators';
import 'rxjs/add/observable/throw';

@Injectable()
export class SynonymPanelService {
  private static readonly BASE_URL = 'https://api.datamuse.com';

  constructor(private _http: Http) {
  }

  public getSynonyms(word: string): Observable<string[]> {
    const url = `${SynonymPanelService.BASE_URL}/words`;
    const search: URLSearchParams = new URLSearchParams();
    search.append('ml', word);

    return this._http.get(url, {search} as RequestOptionsArgs).pipe(
      map((res: Response) => res.json()),
      map((words: {word: string}[]) => words.map(container => container.word)),
      catchError(this._errorHandler)
    );
  }

  private _errorHandler(e) {
    console.error('[SynonymPanelService] error occurred');
    return Observable.throw(e);
  }
}
