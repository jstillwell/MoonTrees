import { Component, Output, EventEmitter } from '@angular/core';
import { Http } from '@angular/http';
import { TableComponent } from '../table/table.component';
import { TreeCardComponent } from '../cards/tree/tree.component';
import { Observable } from 'rxjs/Observable';
import { TreeService } from '../../services/trees/tree.service';
import { SearchObject } from '../../viewModels/SearchObject';
import { SearchFilter } from "app/viewModels/search-filters";

@Component({
    selector: 'tree-locator',
    templateUrl: './locator.component.html',
    styleUrls: ['./locator.component.css']
})
export class LocatorComponent {
    @Output() searchResults = new EventEmitter();

    selected: SearchObject = new SearchObject();
    searchString: string;
    filterOptions = SearchFilter;
    filters: string[] = new Array<string>();
    treeService: TreeService;
    trees: Observable<Tree[]>;

    constructor(private http: Http) {
        this.treeService = new TreeService(http);
        this.trees = this.treeService.getTrees();
    }
    ngOnInit() {
        this.filters = Object.keys(this.filterOptions).filter((value) => {
            return value !== undefined && typeof (value) !== 'number';
        });
    }

    submitForm(e): void {
        e.preventDefault();
        let resp = this.treeService.searchTrees(this.selected.filter, this.selected.searchValue).map((res) =>
            res.json()
        );
        //TODO: emit event or promise
        console.log('Tree search results', resp);
    }
}
