import { ArchiveModule } from './archive.module';

describe('ArchiveModule', () => {
  let archiveModule: ArchiveModule;

  beforeEach(() => {
    archiveModule = new ArchiveModule();
  });

  it('should create an instance', () => {
    expect(archiveModule).toBeTruthy();
  });
});
