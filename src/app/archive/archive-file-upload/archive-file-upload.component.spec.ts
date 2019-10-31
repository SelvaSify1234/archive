import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchiveFileUploadComponent } from './archive-file-upload.component';

describe('ArchiveFileUploadComponent', () => {
  let component: ArchiveFileUploadComponent;
  let fixture: ComponentFixture<ArchiveFileUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArchiveFileUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchiveFileUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
