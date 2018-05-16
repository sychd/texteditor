import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {SynonymPanelService} from './synonym-panel.service';
import {map} from 'rxjs/operators';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Component({
  selector: 'app-synonym-panel',
  templateUrl: './synonym-panel.component.html',
  styleUrls: ['./synonym-panel.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SynonymPanelComponent implements OnChanges {
  @Input()
  public word = '';

  @Output()
  public synonymSelected: EventEmitter<string> = new EventEmitter<string>();

  public synonyms$$: BehaviorSubject<string[]> = new BehaviorSubject([]);

  private _selectedSynonym: string | null = null;

  constructor(private _synonymPanelService: SynonymPanelService) {
  }

  public ngOnChanges(sc: SimpleChanges) {
    const shouldResetState = sc['word'] && sc['word'].currentValue === this._selectedSynonym;
    if (shouldResetState) {
      this._resetSynonyms();
      return;
    }

    this._updateSynonyms(sc['word'].currentValue);
  }

  public performSelection(synonym: string): void {
    this._selectedSynonym = synonym;
    this.synonymSelected.emit(synonym);
  }

  public isSynonymSelected(synonym: string): boolean {
    return synonym === this._selectedSynonym;
  }

  private _resetSynonyms(): void {
    this.synonyms$$.next([]);
    this._selectedSynonym = null;
  }

  private _updateSynonyms(word: string): void {
    this._synonymPanelService.getSynonyms(word).pipe(
      map((words: string[]) => words.slice(0, 5))
    ).subscribe(v => {
      this.synonyms$$.next(v);
    });
  }
}
