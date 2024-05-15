import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ApiService } from './api.service';
import { dummyUser } from '../dummy-data/dummy-user';
import { dummyRepo } from '../dummy-data/dummy-repo';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService],
    });

    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set and get error message', () => {
    const errorMessage = 'User not found';
    service.setError(errorMessage);
    expect(service.getError()).toEqual(errorMessage);
  });

  it('should make a GET request to fetch user data', () => {
    service.getUser('arpitagrawal24').subscribe((response) => {
      expect(response).toEqual(dummyUser);
    });

    const req = httpMock.expectOne('https://api.github.com/users/arpitagrawal24');
    expect(req.request.method).toBe('GET');
    req.flush(dummyUser);
  });

  it('should make a GET request to fetch user repositories', () => {
    service.getRepos('arpitagrawal24', 1, 10).subscribe((response: any) => {
      expect(response).toEqual(dummyRepo);
    });

    const req = httpMock.expectOne(
      'https://api.github.com/users/arpitagrawal24/repos?page=1&per_page=10'
    );
    expect(req.request.method).toBe('GET');
    req.flush(dummyRepo);
  });
});
