import { Component, Input } from '@angular/core';
import { MdCard } from '@angular/material';

@Component({
  selector: 'tree-card',
  styleUrls: ['./tree.component.less'],
  templateUrl: './tree.component.html'
})
export class TreeCardComponent {
    @Input() tree: any;
}
