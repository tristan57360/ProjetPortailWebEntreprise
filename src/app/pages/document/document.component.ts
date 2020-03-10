import { Component, OnInit, Input } from '@angular/core';
import { Document } from 'src/app/model/document';
@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss']
})
export class DocumentComponent implements OnInit {
  @Input() document: Document;

  constructor() { }

  ngOnInit() {
  }

}
