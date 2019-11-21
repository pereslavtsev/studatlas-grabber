import { Controller, UsePipes, ValidationPipe } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { GetDocumentDto } from '../dto/get-document.dto';
import { ListDocumentSaveStoriesDto } from '../dto/list-document-save-stories.dto';
import { ListGroupDocumentsDto } from '../dto/list-group-documents.dto';
import { DocumentsService } from '../services/documents.service';
import { SaveStoriesService } from '../services/save-stories.service';

@Controller()
export class DocumentsController {
  constructor(
    private readonly documentsService: DocumentsService,
    private readonly saveStoriesService: SaveStoriesService,
  ) {}

  @GrpcMethod('DocumentService', 'GetDocument')
  @UsePipes(new ValidationPipe())
  findOne({ id, academyId }: GetDocumentDto) {
    return this.documentsService.fetchById(id, academyId);
  }

  @GrpcMethod('DocumentService', 'ListGroupDocuments')
  @UsePipes(new ValidationPipe())
  findByGroupId({ academyId, facultyId, groupId, years, semester }: ListGroupDocumentsDto) {
    return this.documentsService.fetchByGroupId({ academyId, facultyId, groupId, years, semester });
  }

  @GrpcMethod('DocumentService', 'ListDocumentSaveStories')
  @UsePipes(new ValidationPipe())
  async findHistoryByBookId({ id, academyId }: ListDocumentSaveStoriesDto) {
    const saveStories = await this.saveStoriesService.fetchStoriesByDocumentId(id, academyId);
    return { data: saveStories };
  }
}
