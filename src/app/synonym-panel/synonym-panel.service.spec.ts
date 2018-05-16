/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SynonymPanelService } from './synonym-panel.service';

describe('SynonymPanelService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SynonymPanelService]
    });
  });

  it('should ...', inject([SynonymPanelService], (service: SynonymPanelService) => {
    expect(service).toBeTruthy();
  }));
});
