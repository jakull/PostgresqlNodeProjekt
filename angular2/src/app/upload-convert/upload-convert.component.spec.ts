import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadConvertComponent } from './upload-convert.component';

describe('UploadConvertComponent', () => {
  let component: UploadConvertComponent;
  let fixture: ComponentFixture<UploadConvertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UploadConvertComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadConvertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
