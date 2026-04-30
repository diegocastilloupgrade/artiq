import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { Topic, TopicStatus, TopicType } from '../topic.model';
import { TopicsService } from '../topics.service';

@Component({
  selector: 'app-topic-detail',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSelectModule,
  ],
  templateUrl: './topic-detail.component.html',
  styleUrls: ['./topic-detail.component.scss'],
})
export class TopicDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly topicsService = inject(TopicsService);

  topic: Topic | null = null;
  loading = false;
  saving = false;
  error: string | null = null;
  actionMessage: string | null = null;

  formName = '';
  formDescription = '';
  formType = TopicType.OTHER;
  formStatus = TopicStatus.CANDIDATE;
  formPriority = 0;
  formSourceName = '';
  formInternalNotes = '';
  formTags = '';
  formRelevantDates = '';

  readonly statusOptions = Object.values(TopicStatus);
  readonly typeOptions = Object.values(TopicType);

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (!id) {
        this.error = 'ID de topic inválido.';
        return;
      }
      this.loadTopic(id);
    });
  }

  saveChanges(): void {
    if (!this.topic) {
      return;
    }

    this.saving = true;
    this.actionMessage = null;
    this.topicsService
      .update(this.topic.id, {
        name: this.formName.trim(),
        description: this.formDescription.trim() || undefined,
        type: this.formType,
        status: this.formStatus,
        priority: Number(this.formPriority),
        source_name: this.formSourceName.trim() || undefined,
        internal_notes: this.formInternalNotes.trim() || undefined,
        tags: this.parseCsv(this.formTags),
        relevant_dates: this.parseCsv(this.formRelevantDates),
      })
      .subscribe({
        next: (updatedTopic) => {
          this.topic = updatedTopic;
          this.populateForm(updatedTopic);
          this.actionMessage = 'Cambios guardados correctamente.';
          this.saving = false;
        },
        error: () => {
          this.error = 'No se pudieron guardar los cambios del topic.';
          this.saving = false;
        },
      });
  }

  markPrioritized(): void {
    if (!this.topic) {
      return;
    }

    this.saving = true;
    this.actionMessage = null;
    this.topicsService.prioritize(this.topic.id).subscribe({
      next: (updatedTopic) => {
        this.topic = updatedTopic;
        this.populateForm(updatedTopic);
        this.actionMessage = 'Topic marcado como priorizado.';
        this.saving = false;
      },
      error: () => {
        this.error = 'No se pudo marcar como priorizado.';
        this.saving = false;
      },
    });
  }

  discardTopic(): void {
    if (!this.topic) {
      return;
    }

    this.saving = true;
    this.actionMessage = null;
    this.topicsService.discard(this.topic.id).subscribe({
      next: (updatedTopic) => {
        this.topic = updatedTopic;
        this.populateForm(updatedTopic);
        this.actionMessage = 'Topic descartado correctamente.';
        this.saving = false;
      },
      error: () => {
        this.error = 'No se pudo descartar el topic.';
        this.saving = false;
      },
    });
  }

  private loadTopic(id: string): void {
    this.loading = true;
    this.error = null;
    this.actionMessage = null;

    this.topicsService.getById(id).subscribe({
      next: (topic) => {
        this.topic = topic;
        this.populateForm(topic);
        this.loading = false;
      },
      error: () => {
        this.error = 'No se pudo cargar el detalle del topic.';
        this.loading = false;
      },
    });
  }

  private populateForm(topic: Topic): void {
    this.formName = topic.name;
    this.formDescription = topic.description ?? '';
    this.formType = topic.type;
    this.formStatus = topic.status;
    this.formPriority = topic.priority;
    this.formSourceName = topic.source_name ?? '';
    this.formInternalNotes = topic.internal_notes ?? '';
    this.formTags = (topic.tags ?? []).join(', ');
    this.formRelevantDates = (topic.relevant_dates ?? []).join(', ');
  }

  private parseCsv(value: string): string[] | undefined {
    const parts = value
      .split(',')
      .map((item) => item.trim())
      .filter((item) => item.length > 0);
    return parts.length > 0 ? parts : undefined;
  }
}
