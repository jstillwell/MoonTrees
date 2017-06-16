import { Component } from '@angular/core';
import { MdInputContainer } from '@angular/material';
import { TreeService } from '../../trees/locator.service';

@Component({
  selector: 'add-tree-card',
  styleUrls: ['./add-tree.component.less'],
  templateUrl: './add-tree.component.html'
})
export class AddTreeCardComponent {
    tree: Tree;
    public submitForm(e) {
        e.preventDefault();
        //TODO:
    }
}
