import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { TreeService } from '../trees/locator.service';
import { Observable } from "rxjs/Observable";

@Component({
    selector: 'locator',
    templateUrl: './locator.component.html',
    styleUrls: ['./locator.component.css']
})
export class LocatorComponent {
    treeService: TreeService;
    postalCode: string;
    trees: Observable<any>;

    constructor(private http: Http) {
        this.treeService = new TreeService(http);
        this.trees = this.treeService.getTrees();
        //console.info('All trees', this.trees);
    }
    
    submitForm(e): void {
        e.preventDefault();
        let resp = this.treeService.searchTrees('postalCode', this.postalCode).map((res) =>
          res.json()
        );
        console.log('Tree search results', resp);
    }
}
