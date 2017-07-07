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
    styleUrls: ['./locator.component.less']
})
export class LocatorComponent {
    @Output() onSearchClicked: EventEmitter<any> = new EventEmitter();
    @Output() onResultsChanged: EventEmitter<any> = new EventEmitter();

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
        let allFilters = Object.keys(this.filterOptions);
        this.filters = allFilters.slice(allFilters.length / 2);
    }

    submitForm(e): void {
        e.preventDefault();
        this.onSearchClicked.emit(null);

        console.info("Form values", this.selected);
        this.treeService.searchTrees(this.selected.filter, this.selected.searchValue)
            .subscribe(message => {
                this.onResultsChanged.emit(message);
            });
    }
}
