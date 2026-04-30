import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { Topic, TopicStatus, TopicType } from '../topic.model';
import { TopicsService } from '../topics.service';

interface TopicFilter {
  status: string;
  type: string;
}

@Component({
  selector: 'app-topics-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatSortModule,
    MatSelectModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatCardModule,
  ],
  templateUrl: './topics-list.component.html',
  styleUrls: ['./topics-list.component.scss'],
})
export class TopicsListComponent implements OnInit, AfterViewInit {
  private readonly topicsService = inject(TopicsService);

  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns = ['name', 'source', 'type', 'status', 'priority', 'created_at'];
  dataSource = new MatTableDataSource<Topic>([]);
  loading = false;
  error: string | null = null;

  statusOptions = Object.values(TopicStatus);
  typeOptions = Object.values(TopicType);

  filterStatus = '';
  filterType = '';

  readonly TopicStatus = TopicStatus;
  readonly TopicType = TopicType;

  ngOnInit(): void {
    this.dataSource.filterPredicate = (data: Topic, filter: string) => {
      const f: TopicFilter = JSON.parse(filter);
      return (
        (!f.status || data.status === f.status) &&
        (!f.type || data.type === f.type)
      );
    };
    this.load();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  load(): void {
    this.loading = true;
    this.error = null;
    this.topicsService.getAll().subscribe({
      next: (topics) => {
        this.dataSource.data = topics;
        this.loading = false;
      },
      error: () => {
        this.error = 'Error al cargar los topics.';
        this.loading = false;
      },
    });
  }

  applyFilters(): void {
    this.dataSource.filter = JSON.stringify({
      status: this.filterStatus,
      type: this.filterType,
    });
  }
}
